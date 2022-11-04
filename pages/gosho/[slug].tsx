import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import ParagraphWithNotes from "@components/ParagraphWithNotes";
import PostMenu from "@components/PostMenu";

import { getPost, getSlugs } from "../../lib/wordpress";
import { useRouter } from "next/router";
import ArticleLoading from "@components/ArticleLoading";
import { extractNotes, extractParagraphs } from "@utils/articleUtils";

export default function PostPage({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <ArticleLoading />;
  }

  const notesArray = extractNotes(post?.acf?.acf_note);
  const paragraphs = extractParagraphs(post.content.rendered);

  return (
    <>
      <Head>
        <title>{post.title.rendered} | NICHIREN Library</title>
      </Head>
      <HomeNavbar />
      <main>
        <div className="bg-white px-2 py-8 lg:p-8">
          <div className="container px-4 lg:px-10 mx-auto">
            <h2 className="text-4xl md:text-5xl text-secondary pb-6 border-b-2 border-secondary">
              {post.title.rendered}
            </h2>
            <div className="py-4 flex flex-col-reverse lg:flex-row gap-10">
              <div>
                {paragraphs.map((p) => (
                  <ParagraphWithNotes content={p} notes={notesArray} key={p} />
                ))}

                {post?.acf?.acf_cenni_storici && (
                  <div id="cenni-storici">
                    <h3 className="text-3xl md:text-4xl font-serif text-secondary font-bold mt-4 mb-6">
                      Cenni Storici
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.acf.acf_cenni_storici
                          ?.replace("CENNI STORICI – ", "")
                          .replace(/\n/g, "<br>"),
                      }}
                    ></div>
                  </div>
                )}

                {post?.acf?.acf_note && (
                  <div id="note">
                    <h3 className="text-3xl md:text-4xl font-serif text-secondary font-bold mt-4 mb-6">
                      Note
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: post.acf.acf_note }}
                    ></div>
                  </div>
                )}
              </div>
              <PostMenu currentPostTitle={post.title.rendered} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getSlugs("rsnd");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const post = await getPost(params.slug);

    if (!post) return { notFound: true };

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log("Error fetching static props for", params.slug, error);
    return { notFound: true };
  }
};
