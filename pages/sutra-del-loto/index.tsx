import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import GoshoTableSortButton from "@components/GoshoList/GoshoTableSortButton";
import { INCLUDE_CATEGORY, INCLUDE_NUMBER, getAcfMetadataValue } from "lib/db";
import { ACF_METADATA, SDL_CAT_ID, SDL_INTRO_CAT_ID } from "@utils/constants";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
const prisma = new PrismaClient();

export default function RSND1({ chapters, index }) {
  const [sortField, setSortField] = useState("number");
  const [sortAscend, setSortAscend] = useState(true);

  const onSortChange = (field, ascendent) => {
    setSortAscend(ascendent);
    setSortField(field);
  };

  let sortedData = chapters;

  if (sortField)
    sortedData = chapters.sort((a, b) =>
      a[sortField] > b[sortField] ? 1 : -1
    );

  if (!sortAscend) {
    sortedData = sortedData.reverse();
  }

  return (
    <>
      <Head>
        <title>Sutra del Loto | La Biblioteca di Nichiren</title>
      </Head>

      <HomeNavbar />
      <main>
        <BookDescription
          index={index}
          title="Sutra del Loto"
          baseSlug="sutra-del-loto"
          chapters={[
            {
              number: 0,
              title: "Sutra degli innumerevoli significati",
              disabled: true,
            },
            {
              number: 1,
              title: "Sutra del Loto",
            },
            {
              number: 2,
              title:
                "Sutra per la pratica della meditazione sul bodhisattva virtu universale",
              disabled: true,
            },
          ]}
        />
        <section className="py-14 lg:py-32 px-8" id="gosho-list">
          <div className="container min-h-[50vh] mx-auto max-w-[1400px]">
            <h2 className="text-2xl md:text-4xl text-primary font-bold mb-8">
              Capitoli del Sutra del Loto
            </h2>

            <div className="overflow-auto pb-4">
              <table className="mt-4 text-md md:text-lg w-full table-auto bg-white rounded-3xl border-collapse">
                <thead className="text-left">
                  <tr className="border-b-2 border-primary">
                    <GoshoTableSortButton
                      title="N"
                      field="number"
                      onClick={onSortChange}
                      ascendent={
                        sortField === "number" ? sortAscend : undefined
                      }
                    />
                    <GoshoTableSortButton
                      title="Nome"
                      field="title"
                      onClick={onSortChange}
                      ascendent={sortField === "title" ? sortAscend : undefined}
                    />
                  </tr>
                </thead>
                <tbody className="rounded-full">
                  {sortedData.map((post: any, postIndex: number) => (
                    <tr
                      key={post.slug}
                      className={classNames("bg-defaultBg", {
                        "!bg-white": postIndex % 2,
                      })}
                    >
                      <td width="5" className="px-4 py-2">
                        <span className="mr-8 lg:mr-14  font-medium">
                          {post.number}
                        </span>{" "}
                      </td>
                      <td className="px-4 py-2">
                        <Link href={`/sutra-del-loto/${post.slug}`}>
                          <a className="flex hover:text-primary py-3 font-medium">
                            <span
                              dangerouslySetInnerHTML={{ __html: post.title }}
                            ></span>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [posts, indexPosts] = await Promise.all([
    prisma.d1b1_posts.findMany({
      where: {
        post_type: "sdlpe",
        d1b1_term_relationships: {
          some: { term_taxonomy_id: SDL_CAT_ID },
          none: { term_taxonomy_id: SDL_INTRO_CAT_ID },
        },
      },
      include: { ...INCLUDE_CATEGORY, ...INCLUDE_NUMBER },
    }),

    prisma.d1b1_posts.findMany({
      where: {
        post_type: "sdlpe",
        d1b1_term_relationships: {
          some: { term_taxonomy_id: SDL_INTRO_CAT_ID },
        },
      },
      include: { ...INCLUDE_CATEGORY, ...INCLUDE_NUMBER },
    }),
  ]);

  const postsWithAcf = posts.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    number: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.NUMBER),
  }));

  const index = indexPosts.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    number: getAcfMetadataValue(post.d1b1_postmeta, ACF_METADATA.NUMBER),
  }));

  return {
    props: {
      chapters: postsWithAcf,
      index,
    },
  };
};
