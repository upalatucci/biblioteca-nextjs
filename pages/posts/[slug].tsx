import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { getPost, getSlugs } from "../../lib/wordpress";

export default function PostPage({ post }) {
  return (
    <div className="post container pt-5">
      <h1 className="text-center pb-5">{post.title.rendered}</h1>
      <div
        className="card-text pb-5"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        id="contenuto"
      ></div>

      <div
        className="card-text pb-5"
        dangerouslySetInnerHTML={{ __html: post.acf.acf_notes }}
        id="note"
      ></div>

      <div
        className="card-text pb-5"
        dangerouslySetInnerHTML={{ __html: post.acf.acf_cenni_storici }}
        id="cenni-storici"
      ></div>
      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </div>
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
