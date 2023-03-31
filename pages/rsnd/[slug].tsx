import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import ParagraphWithNotes from "@components/ParagraphWithNotes";
import PostMenu from "@components/PostMenu";

import { useRouter } from "next/router";
import ArticleLoading from "@components/ArticleLoading";
import {
  DEFAULT_REVALIDATE,
  extractNotes,
  extractParagraphs,
} from "@utils/articleUtils";
import useHighlightedPost from "@hooks/useHighlightedPost";
import { removeHTMLTags } from "@utils/utils";
import {
  ACF_METADATA,
  RSND_INTRO_1_CAT_ID,
  RSND_INTRO_2_CAT_ID,
  RSND_VOL_1_CATEGORY_ID,
} from "@utils/constants";

import raccoltaVol1 from "@public/rsnd-I.svg";
import raccoltaVol2 from "@public/rsnd-II.svg";
import Link from "next/link";
import { useContext } from "react";
import { FontSizeContext } from "contexts/FontSizeContext";
import { RSND_APPENDICE_CAT_ID } from "@utils/constants";
import { PrismaClient } from "@prisma/client";
import { unifyAcfMetadata } from "lib/db";
import useAudioWithMarks from "@hooks/useAudioWithMarks";
const prisma = new PrismaClient();

const ItalianListFormatted = new Intl.ListFormat("it", {
  style: "long",
  type: "conjunction",
});

export default function PostPage({ post }) {
  const router = useRouter();
  const { fontSize } = useContext(FontSizeContext);
  const [highlightedPost] = useHighlightedPost(post);

  const { audioRef, currentMark } = useAudioWithMarks(post?.slug);

  if (router.isFallback || !router.isReady) {
    return <ArticleLoading originalPost={post} />;
  }

  const notesArray = extractNotes(highlightedPost?.acf?.acf_note);
  const paragraphs = extractParagraphs(highlightedPost.content.rendered);

  const isFirstVolume = highlightedPost?.cat_rsnd.includes(
    RSND_VOL_1_CATEGORY_ID
  );

  const rsndLink = `/rsnd-vol${isFirstVolume ? "1" : "2"}`;

  const isMainBookContent =
    highlightedPost?.acf?.acf_numero &&
    !highlightedPost?.cat_rsnd.find((category) =>
      [
        RSND_APPENDICE_CAT_ID,
        RSND_INTRO_1_CAT_ID,
        RSND_INTRO_2_CAT_ID,
      ].includes(category)
    );

  return (
    <>
      <Head>
        <title>
          {removeHTMLTags(highlightedPost.title.rendered)} | La Biblioteca di
          Nichiren
        </title>
        <meta
          name="Description"
          content={removeHTMLTags(
            highlightedPost?.content.rendered?.substring(0, 155)
          )}
        ></meta>
      </Head>
      <HomeNavbar />
      <main>
        <div className="bg-defaultBg">
          <div className="">
            <div className="bg-white py-14 lg:py-32 px-8 print:py-0 rounded-3xl shadow-md print:rounded-none print:shadow-none">
              <div className="container mx-auto max-w-[1400px] print:py-0">
                <h2
                  className="text-2xl md:text-4xl container text-secondary font-bold print:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: `${
                      isMainBookContent
                        ? `${highlightedPost?.acf?.acf_numero}. `
                        : ""
                    } ${highlightedPost.title.rendered}`,
                  }}
                ></h2>
                <p className="pb-14">
                  <Link href={rsndLink}>
                    <a className="font-sans font-medium text-md md:text-xl text-gray-500 hover:text-primary">
                      RSND, VOLUME {isFirstVolume ? "I" : "II"}
                    </a>
                  </Link>
                </p>

                <PostMenu
                  currentPostTitle={post.title.rendered}
                  withBackgrounds={!!highlightedPost?.acf?.acf_cenni_storici}
                  withNotes={!!highlightedPost?.acf?.acf_note}
                  image={isFirstVolume ? raccoltaVol1 : raccoltaVol2}
                  imageLink={rsndLink}
                  postSlug={post.slug}
                  ref={audioRef}
                />
              </div>
            </div>

            <div className="py-20 lg:py-32 px-8 container mx-auto max-w-[1000px] print:py-0">
              {isMainBookContent &&
                (highlightedPost?.acf?.acf_luogo ||
                  highlightedPost?.acf?.acf_data ||
                  (!!highlightedPost?.acf?.acf_destinatario &&
                    highlightedPost?.acf?.acf_destinatario?.length !== 0)) && (
                  <p className="text-primary font-sans text-lg">
                    {highlightedPost?.acf?.acf_luogo},{" "}
                    {highlightedPost?.acf?.acf_data}. Indirizzata a{" "}
                    {ItalianListFormatted.format(
                      highlightedPost?.acf?.acf_destinatario
                    )}
                    .
                  </p>
                )}
              {paragraphs.map((p, index) => (
                <ParagraphWithNotes
                  content={p}
                  notes={notesArray}
                  key={p}
                  fontSize={fontSize}
                  id={index}
                  currentMarkValue={currentMark?.value}
                />
              ))}
            </div>

            {(highlightedPost?.acf?.acf_cenni_storici ||
              highlightedPost?.acf?.acf_note) && (
              <section className="bg-white">
                <div className="container mx-auto max-w-[1000px] py-20 lg:py-32 px-8">
                  {highlightedPost?.acf?.acf_cenni_storici && (
                    <div id="cenni_storici">
                      <h3 className="text-xl md:text-3xl text-primary font-bold mt-4 mb-6">
                        Cenni Storici
                      </h3>
                      <div
                        className={fontSize}
                        dangerouslySetInnerHTML={{
                          __html: highlightedPost.acf.acf_cenni_storici
                            ?.replace("CENNI STORICI – ", "")
                            .replace(/\n/g, "<br>"),
                        }}
                      ></div>
                    </div>
                  )}

                  {highlightedPost?.acf?.acf_note && (
                    <div id="note">
                      <h3 className="text-xl md:text-3xl text-primary font-bold mt-14 mb-6">
                        Note
                      </h3>
                      <div
                        className={fontSize}
                        dangerouslySetInnerHTML={{
                          __html: highlightedPost.acf.acf_note,
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
  const posts = await prisma.d1b1_posts.findMany({
    where: { post_type: "rsnd" },
  });

  const paths = posts.map((post) => ({ params: { slug: post.post_name } }));

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const post = await prisma.d1b1_posts.findFirst({
      where: { post_name: params.slug as string, post_type: "rsnd" },
      include: {
        d1b1_term_relationships: {
          select: {
            term_taxonomy_id: true,
          },
        },
        d1b1_postmeta: {
          select: {
            meta_value: true,
            meta_key: true,
          },
          where: {
            meta_key: {
              in: [
                ACF_METADATA.NUMBER,
                ACF_METADATA.BACKGROUND,
                ACF_METADATA.NOTE,
                ACF_METADATA.RECIPIENT,
                ACF_METADATA.PLACE,
                ACF_METADATA.DATE,
              ],
            },
          },
        },
      },
    });

    const acf = unifyAcfMetadata(post.d1b1_postmeta);

    if (!post) return { notFound: true, revalidate: DEFAULT_REVALIDATE };

    return {
      props: {
        post: {
          content: {
            rendered: post.post_content,
          },
          title: {
            rendered: post.post_title,
          },
          slug: post.post_name,
          acf,
          cat_rsnd: post.d1b1_term_relationships.map((term) =>
            Number(term.term_taxonomy_id)
          ),
        },
      },
    };
  } catch (error) {
    console.log("Error fetching static props for", params.slug, error);
    return { notFound: true, revalidate: DEFAULT_REVALIDATE };
  }
};
