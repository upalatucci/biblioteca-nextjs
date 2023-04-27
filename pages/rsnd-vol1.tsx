import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import GoshoList from "@components/GoshoList";
import { GetStaticProps } from "next";
import {
  ACF_METADATA,
  RSND_APPENDICE_CAT_ID,
  RSND_INTRO_1_CAT_ID,
  RSND_VOL_1_CATEGORY_ID,
  RSND_VOL_2_CATEGORY_ID,
} from "@utils/constants";
import {
  INCLUDE_CATEGORY,
  INCLUDE_METADATA,
  INCLUDE_NUMBER,
  getAcfMetadataValue,
  prismaClient,
} from "lib/db";

export default function RSND1({ gosho, index, appendix }) {
  return (
    <>
      <Head>
        <title>RSND Vol. 1 | La Biblioteca di Nichiren</title>
      </Head>

      <main>
        <BookDescription
          index={index}
          notes={appendix}
          title="Raccolta degli Scritti di Nichiren Daishonin"
          subtitle="VOLUME I"
        />
        <GoshoList jsonData={gosho} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [posts, indexPosts, appendixPosts] = await Promise.all([
    prismaClient.d1b1_posts.findMany({
      where: {
        post_type: "rsnd",

        d1b1_term_relationships: {
          every: {
            AND: { term_taxonomy_id: RSND_VOL_1_CATEGORY_ID },
            NOT: [
              {
                term_taxonomy_id: RSND_APPENDICE_CAT_ID,
              },
              {
                term_taxonomy_id: RSND_INTRO_1_CAT_ID,
              },
            ],
          },
        },
      },
      include: INCLUDE_METADATA,
    }),
    prismaClient.d1b1_posts.findMany({
      where: {
        post_type: "rsnd",

        d1b1_term_relationships: {
          some: { term_taxonomy_id: RSND_INTRO_1_CAT_ID },
        },
      },
      include: { ...INCLUDE_CATEGORY, ...INCLUDE_NUMBER },
    }),
    prismaClient.d1b1_posts.findMany({
      where: {
        post_type: "rsnd",
        d1b1_term_relationships: {
          some: { term_taxonomy_id: RSND_APPENDICE_CAT_ID },
          none: { term_taxonomy_id: RSND_VOL_2_CATEGORY_ID },
        },
      },
      include: { ...INCLUDE_CATEGORY, ...INCLUDE_NUMBER },
    }),
  ]);

  const postsWithAcf = posts.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    recipient: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.RECIPIENT),
    place: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.PLACE),
    date: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.DATE),
    number: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.NUMBER),
  }));

  const index = indexPosts.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    number: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.NUMBER),
  }));

  const appendix = appendixPosts.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    number: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.NUMBER),
  }));

  return {
    props: {
      gosho: postsWithAcf,
      index,
      appendix,
    },
  };
};
