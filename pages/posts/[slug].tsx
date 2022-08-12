import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import PostMenu from "../../components/PostMenu";

import { getPost, getSlugs } from "../../lib/wordpress";

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title.rendered} | NICHIREN Library</title>
      </Head>
      <div>
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <div className="post-background">
          <div className="post">
            <h2 className="text-center ">{post.title.rendered}</h2>
            <div className="post-content">
              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                id="contenuto"
              ></div>

              <div id="cenni-storici">
                <h3>Cenni Storici</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.acf.acf_cenni_storici.replace(
                      "CENNI STORICI – ",
                      ""
                    ),
                  }}
                ></div>
              </div>

              <div id="note">
                <h3>Note</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: post.acf.acf_notes }}
                ></div>
              </div>
            </div>
            <PostMenu />
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: {
      post,
    },
  };
};
