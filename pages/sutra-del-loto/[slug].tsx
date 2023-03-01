import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import ParagraphWithNotes from "@components/ParagraphWithNotes";

import { getPost, getSlugs } from "../../lib/wordpress";
import ArticleLoading from "@components/ArticleLoading";
import { useRouter } from "next/router";
import {
  DEFAULT_REVALIDATE,
  extractNotes,
  extractParagraphs
} from "@utils/articleUtils";
import useHighlightedPost from "@hooks/useHighlightedPost";
import { removeHTMLTags } from "@utils/utils";
import PostMenu from "@components/PostMenu";
import sutraDelLoto from "@public/sutra-del-loto.jpg";
import Link from "next/link";

export default function PostPage({ post }) {
  const router = useRouter();

  const [highlightedPost, isLoadingHighligh] = useHighlightedPost(post);

  if (router.isFallback || isLoadingHighligh) {
    return <ArticleLoading originalPost={post} />;
  }

  const notesArray = extractNotes(highlightedPost?.acf?.acf_note);
  const paragraphs = extractParagraphs(highlightedPost.content.rendered);

  return (
    <>
      <Head>
        <title>
          {removeHTMLTags(highlightedPost.title.rendered)} | NICHIREN Library
        </title>
      </Head>
      <HomeNavbar />
      <main>
        <div className="bg-defaultBg">
          <div className="">
            <div className="bg-white py-20 lg:py-32 px-8 rounded-xl shadow-md print:rounded-none print:shadow-none">
              <div className="container mx-auto max-w-[1400px] print:py-0">
                <h2
                  className="text-4xl md:text-3xl container text-secondary font-bold"
                  dangerouslySetInnerHTML={{
                    __html: `${highlightedPost?.acf?.acf_numero} ${highlightedPost.title.rendered}`
                  }}
                ></h2>
                <p className="text-gray-400 pb-14">
                  <Link href="/sutra-del-loto">
                    <a className="font-sans font-medium text-xl text-gray-500 hover:text-primary">Sutra del Loto</a>
                  </Link>
                </p>

                <PostMenu
                  currentPostTitle={post.title.rendered}
                  withBackgrounds={!!highlightedPost?.acf?.acf_cenni_storici}
                  withNotes={!!highlightedPost?.acf?.acf_note}
                  image={sutraDelLoto}
                  imageLink="/sutra-del-loto"
                />
              </div>
            </div>
            <div className="py-20 lg:py-32 px-8 container mx-auto max-w-[1000px] print:py-0">
              {paragraphs.map((p) => (
                <ParagraphWithNotes content={p} notes={notesArray} key={p} />
              ))}
            </div>

            {(highlightedPost?.acf?.acf_cenni_storici ||
              highlightedPost?.acf?.acf_note) && (
              <section className="bg-white">
                <div className="container mx-auto max-w-[1000px] py-20 lg:py-32 px-8 ">
                  {highlightedPost?.acf?.acf_cenni_storici && (
                    <div id="cenni_storici">
                      <h3 className="text-xl md:text-3xl text-primary font-bold mt-4 mb-6">
                        Cenni Storici
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightedPost.acf.acf_cenni_storici
                            ?.replace("CENNI STORICI – ", "")
                            .replace(/\n/g, "<br>")
                        }}
                      ></div>
                    </div>
                  )}

                  {highlightedPost?.acf?.acf_note && (
                    <div id="note">
                      <h3 className="text-xl md:text-3xl text-primary font-bold mt-4 mb-6">
                        Note
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightedPost.acf.acf_note
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getSlugs("sdlpe");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const post = await getPost(params.slug, "sdlpe");

    if (!post) return { notFound: true, revalidate: DEFAULT_REVALIDATE };

    return {
      props: {
        post
      }
    };
  } catch (error) {
    console.log("Error fetching static props for", params.slug, error);
    return { notFound: true, revalidate: DEFAULT_REVALIDATE };
  }
};
