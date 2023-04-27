import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import { FormEventHandler, useEffect, useState } from "react";
import classNames from "classnames";
import Footer from "@components/Footer";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps } from "next";
import { INCLUDE_CATEGORY, prismaClient } from "lib/db";
import DictionarySearch from "@components/DictionarySearch/DictionarySearch";

const alfabeto = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

export default function Glossario({ glossary }) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const selectedLetter = router?.query?.lettera as string;

  useEffect(() => {
    setSearchText(router?.query?.q as string);
  }, [router?.query?.q]);

  const clearFilters = () => {
    setSearchText("");

    const newQuery = { ...router.query };

    delete newQuery.lettera;

    router.push(
      {
        ...router,
        query: newQuery,
        hash: null,
      },
      null,
      { scroll: false, shallow: true }
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    router.push({
      ...router,
      query: { ...router.query, q: searchText },
      hash: "risultati",
    });
  };

  useEffect(() => {
    setSearchText(router?.query?.q as string);
  }, [router?.query?.q]);

  const onClickLetter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const letter = event.currentTarget.innerText;

    setSearchText("");

    const newQuery: ParsedUrlQuery = { ...router.query, lettera: letter };

    delete newQuery.q;

    router.push(
      {
        ...router,
        query: newQuery,
        hash: "risultati",
      },
      null,
      { scroll: false }
    );
  };

  return (
    <>
      <Head>
        <title>Glossario | La Biblioteca di Nichiren</title>
      </Head>

      <main>
        <section className="bg-defaultBg" id="glossario-cerca">
          <div className="bg-white shadow-md rounded-3xl py-14 lg:py-32 px-8">
            <div className="mx-auto max-w-[1400px]">
              <h2 className="text-2xl md:text-4xl font-bold mb-8">Glossario</h2>
              <form
                className="bg-defaultBg shadow-md rounded-3xl p-8 flex flex-col flex-wrap font-sans"
                onSubmit={onSubmit}
              >
                <div className="flex flex-wrap items-center justify-center xl:justify-between gap-1">
                  {alfabeto.map((lettera) => (
                    <button
                      type="button"
                      key={lettera}
                      className={classNames(
                        "h-8 w-8 rounded-xl border-primary border bg-white",
                        {
                          "bg-gray-50 text-gray-400 border-gray-400":
                            selectedLetter === lettera,
                        }
                      )}
                      onClick={onClickLetter}
                    >
                      {lettera}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>
          <DictionarySearch
            glossary={glossary}
            letter={selectedLetter}
            filterText={searchText}
            setSearchText={setSearchText}
            clearFilters={clearFilters}
          />
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prismaClient.d1b1_posts.findMany({
    where: {
      post_type: "glossary",
    },
    include: INCLUDE_CATEGORY,
    orderBy: {
      post_title: "asc",
    },
  });

  const glossary = posts.map((post) => ({
    id: Number(post.ID),
    title: post.post_title,
    content: post.post_content,
    cat: post.d1b1_term_relationships.map((term) =>
      Number(term.term_taxonomy_id)
    ),
  }));

  return {
    props: {
      glossary,
    },
  };
};
