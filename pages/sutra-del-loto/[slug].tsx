import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import ParagraphWithNotes from "@components/ParagraphWithNotes";
import PostMenu from "@components/PostMenu";

import { getPost, getSlugs } from "../../lib/wordpress";

const extractNotes = (notesHTML: string): string[] => {
  const replaceRegex = new RegExp(
    '<div id="nota-\\d+">\\d+. <a href="#ref-\\d+">↑</a>\t'
  );
  const splitRegex = new RegExp("</div>");
  return notesHTML
    ?.split(splitRegex)
    .filter((note) => note)
    .map((note) => note.replace(replaceRegex, ""));
};

const extractParagraphs = (content: string): string[] => {
  const a = content.split("</p>\n");
  const b = a.filter((p) => p);
  const c = b.map((p) => p.replace(/^<p>/g, ""));

  return c;
};

export default function PostPage({ post }) {
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
  const paths = await getSlugs("sdlpe");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug, "sdlpe");
  return {
    props: {
      post,
    },
  };
};
