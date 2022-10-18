import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BOOKS } from "@utils/constants";
import SearchInput from "./SearchInput";
import Loading from "./Loading";

type SimpleSearchType = {
  loading: boolean;
};

const SimpleSearch: FC<SimpleSearchType> = ({ loading }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.q as string);

  const hasQuerySources = Boolean(router.query.sources);
  const querySources = Array.isArray(router.query.sources)
    ? (router.query.sources as BOOKS[])
    : [router.query.sources as BOOKS];

  const initialSources: BOOKS[] = hasQuerySources
    ? querySources
    : [BOOKS.RSND, BOOKS.SUTRA, BOOKS.GLOSSARIO];

  const [searchResouces, setSearchResouces] = useState(initialSources);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!searchText) return;

    router.query.q = searchText;
    router.query.sources = searchResouces as string[];
    router.push({ ...router, hash: "risultati" });
  };

  useEffect(() => {
    const searchQueryString = router.query.q as string;
    if (searchQueryString) {
      setSearchText(searchQueryString);
    }
  }, [router.query.q]);

  const onResouceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchResouces.includes(event.target.value as BOOKS)) {
      let filterResouces = searchResouces.filter(
        (resouce) => resouce !== event.target.value
      );

      if (filterResouces.length === 0) filterResouces = [BOOKS.RSND];
      setSearchResouces(filterResouces);
    } else {
      setSearchResouces((resouces) =>
        resouces.concat([event.target.value as BOOKS])
      );
    }
  };

  return (
    <div className="bg-white  py-14">
      <form onSubmit={onSubmit}>
        <section className="font-sans md:px-10">
          <div className="container mx-auto md:px-10">
            <h2 className="text-4xl md:text-5xl px-4 font-bold">
              Fai la tua ricerca:
            </h2>

            <div className="rounded-2xl bg-defaultBg p-8 my-14 shadow-md flex flex-col items-center justify-evenly h-80">
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <div className="flex items-center">
                <span className="mx-4">
                  <label className="flex">
                    <input
                      type="checkbox"
                      value={BOOKS.RSND}
                      checked={searchResouces.includes(BOOKS.RSND)}
                      onChange={onResouceChange}
                    />
                    <strong className="ml-2">RSND</strong>
                  </label>
                </span>
                <span className="mx-4">
                  <label className="flex">
                    <input
                      type="checkbox"
                      value={BOOKS.SUTRA}
                      checked={searchResouces.includes(BOOKS.SUTRA)}
                      onChange={onResouceChange}
                    />
                    <strong className="ml-2">Il Sutra del Loto</strong>
                  </label>
                </span>
                <span className="mx-4">
                  <label className="flex">
                    <input
                      type="checkbox"
                      value={BOOKS.GLOSSARIO}
                      checked={searchResouces.includes(BOOKS.GLOSSARIO)}
                      onChange={onResouceChange}
                    />
                    <strong className="ml-2">Glossario</strong>
                  </label>
                </span>
              </div>
            </div>
            <div className="px-4 flex items-center justify-center mb-12">
              <button
                className="btn font-sans bg-primary hover:bg-primaryHover rounded-3xl w-36 h-10 text-white text-lg mx-4"
                type="submit"
              >
                <div className="flex items-center justify-center">
                  {loading && <Loading />}
                  Cerca
                </div>
              </button>

              <button
                className="btn rounded-3xl h-10 w-36 border border-secondary hover:text-white hover:bg-secondary"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      </form>
      <div className="mt-4 flex items-center justify-center">
        <Link href="/ricerca-avanzata" passHref>
          <a className="btn bg-secondary text-white rounded-3xl text-center font-sans py-2 px-8">
            Vai alla ricerca avanzata
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SimpleSearch;
