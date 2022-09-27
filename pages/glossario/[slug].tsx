import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import HomeNavbar from "../../components/Navbar/HomeNavbar";

import { getPost, getSlugs } from "../../lib/wordpress";

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title.rendered} | NICHIREN Library</title>
      </Head>
      <HomeNavbar />
      <main>
        <div className="bg-white px-2 py-8 lg:p-8 min-h-[70vh]">
          <div className="post container lg:px-10 mx-auto">
            <h2
              className="text-4xl md:text-5xl text-secondary pb-6 border-b-2 border-secondary"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="post-content">
              <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getSlugs("glossario");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug, "glossario");
  return {
    props: {
      post
    }
  };
};
