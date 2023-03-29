import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import SearchInput from "@components/SearchInput";
import classNames from "classnames";
import Footer from "@components/Footer";
import DictionarySearch from "@components/DictionarySearch";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import { INCLUDE_CATEGORY } from "lib/db";
const prisma = new PrismaClient();

const alfabeto = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

export default function Glossario({ glossary }) {
  const router = useRouter();

  const selectedLetter = router?.query?.lettera as string;

  const [searchText, setSearchText] = useState("");

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
      { scroll: false }
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

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newQuery: ParsedUrlQuery = { ...router.query, q: event.target.value };

    delete newQuery.lettera;
    delete newQuery.page;

    if (router.query.lettera || router.query.page) {
      router.push({ ...router, query: newQuery }, null, { scroll: false });
    }

    setSearchText(event.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Glossario | La Biblioteca di Nichiren</title>
      </Head>

      <HomeNavbar />
      <main>
        <section className="bg-defaultBg" id="glossario-cerca">
          <div className="bg-white shadow-md rounded-3xl py-14 lg:py-32 px-8">
            <div className="mx-auto max-w-[1400px]">
              <h2 className="text-2xl md:text-4xl font-bold mb-8">Glossario</h2>
              <form
                className="bg-defaultBg shadow-md rounded-3xl p-8 flex flex-col flex-wrap font-sans"
                onSubmit={onSubmit}
              >
                <div className="mb-4 flex items-stretch lg:items-center justify-between flex-wrap flex-col xl:flex-row">
                  <label className="flex flex-col md:flex-row w-full md:items-center mb-6">
                    <span className="font-bold mr-4 mb-4 md:mb-0">
                      Cerca un termine
                    </span>
                    <SearchInput
                      onChange={onSearch}
                      value={searchText}
                      placeholder="Inserisci la parola che stai cercando"
                      className="border-primary"
                    />
                  </label>
                </div>
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
            clearFilters={clearFilters}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.d1b1_posts.findMany({
    where: {
      post_type: "glossary",
    },
    include: INCLUDE_CATEGORY,
    orderBy: {
      post_title: "asc",
    },
  });

  const glossary = posts.map((post) => ({
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
