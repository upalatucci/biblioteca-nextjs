import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import ParagraphWithNotes from "../../components/ParagraphWithNotes";
import PostMenu from "../../components/PostMenu";

import { getPost, getSlugs } from "../../lib/wordpress";

const extractNotes = (notesHTML: string): string[] => {
  const replaceRegex = new RegExp(
    '<div id="nota-\\d+">\\d+. <a href="#ref-\\d+">↑</a>\t'
  );
  const splitRegex = new RegExp("</div>");
  return notesHTML
    .split(splitRegex)
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
  const notesArray = extractNotes(post.acf.acf_notes);
  const paragraphs = extractParagraphs(post.content.rendered);

  return (
    <>
      <Head>
        <title>{post.title.rendered} | NICHIREN Library</title>
      </Head>
      <div>
        <HomeNavbar />
        <div className="bg-white px-2 py-8 lg:p-8">
          <div className="post container lg:px-10 mx-auto">
            <h2 className="text-4xl md:text-5xl text-secondary pb-6 border-b-2 border-secondary">{post.title.rendered}</h2>
            <div className="post-content">
              {paragraphs.map((p) => (
                <ParagraphWithNotes content={p} notes={notesArray} key={p} />
              ))}

              <div id="cenni-storici">
                <h3 className="text-3xl md:text-4xl font-serif text-secondary font-bold mt-4 mb-6">Cenni Storici</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.acf.acf_cenni_storici
                      .replace("CENNI STORICI – ", "")
                      .replace(/\n/g, "<br>")
                  }}
                ></div>
              </div>

              <div id="note">
                <h3 className="text-3xl md:text-4xl font-serif text-secondary font-bold mt-4 mb-6">Note</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: post.acf.acf_notes }}
                ></div>
              </div>
            </div>
            <PostMenu currentPostTitle={post.title.rendered} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getSlugs("posts");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: {
      post
    }
  };
};
