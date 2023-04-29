import React, { useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { createFuzzyIndex, highlight } from "@utils/fuzzySearch";
import Pagination, { usePagination } from "../Pagination";
import { GLOSSARY_RSND_CAT_ID, GLOSSARY_SDL_CAT_ID } from "@utils/constants";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import SearchInput from "../SearchInput";
import { ParsedUrlQuery } from "querystring";
import { getTabUrl } from "./utils";

type DictionaryItem = {
  id: number;
  title: string;
  content: string;
  cat: number[];
};

type DictionarySearchProps = {
  glossary: DictionaryItem[];
  filterText: string;
  letter: string;
  setSearchText: (newValue: string) => void;
  clearFilters: () => void;
};

const getCategoryFromBook = (book: string) => {
  switch (book) {
    case "rsnd":
      return GLOSSARY_RSND_CAT_ID;
    case "sdl":
      return GLOSSARY_SDL_CAT_ID;
    default:
      return null;
  }
};

const selectedTabClass =
  "font-bold text-black !bg-white border border-gray-200 rounded-t-3xl border-b-0 relative top-[0.5px]";

const DictionarySearch: React.FC<DictionarySearchProps> = ({
  glossary,
  letter,
  filterText,
  setSearchText,
  clearFilters,
}) => {
  const router = useRouter();

  const filterCategory = getCategoryFromBook(router.query.book as string);
  const fuseRef = useRef<Fuse<DictionaryItem>>();

  useEffect(() => {
    fuseRef.current = createFuzzyIndex<DictionaryItem>(glossary);
  }, [glossary]);

  let glossarioFiltrato: DictionaryItem[];

  if (filterText?.length > 1) {
    glossarioFiltrato = highlight(fuseRef.current?.search(filterText));
    console.log(glossarioFiltrato);
  } else if (letter || filterText?.length === 1) {
    const filterByFirstLetter = letter || filterText?.toUpperCase();
    glossarioFiltrato = glossary?.filter((termine) =>
      termine?.title?.toUpperCase().startsWith(filterByFirstLetter)
    );
  } else {
    glossarioFiltrato = glossary;
  }

  const totalResults = glossarioFiltrato?.length || 0;
  const rsndResults =
    glossarioFiltrato?.filter((item) => item.cat.includes(GLOSSARY_RSND_CAT_ID))
      .length || 0;
  const sdlResults =
    glossarioFiltrato?.filter((item) => item.cat.includes(GLOSSARY_SDL_CAT_ID))
      .length || 0;

  const glossarioFilteredByCategory = filterCategory
    ? (glossarioFiltrato || []).filter((item) =>
        item.cat.includes(filterCategory)
      )
    : glossarioFiltrato;

  const dictionaryToShow = usePagination(glossarioFilteredByCategory);

  const onSearch = (newSearchValue: string) => {
    const newQuery: ParsedUrlQuery = { ...router.query, q: newSearchValue };

    delete newQuery.lettera;
    delete newQuery.page;

    if (router.query.lettera || router.query.page) {
      router.push({ ...router, query: newQuery }, null, {
        scroll: false,
        shallow: true,
      });
    }

    setSearchText(newSearchValue);
  };

  return (
    <>
      <div className="pt-14 lg:pt-32 px-8 " id="risultati">
        <h3 className="max-w-[1400px] mx-auto text-2xl md:text-4xl text-primary font-bold mb-4">
          Abbiamo trovato
        </h3>

        <div className="max-w-[1400px] mx-auto flex items-stretch lg:items-center justify-between flex-wrap flex-col xl:flex-row">
          <label className="flex flex-col md:flex-row w-full md:items-cente">
            <SearchInput
              onChange={onSearch}
              value={filterText}
              placeholder="Cerca un termine"
              className="border-primary !max-w-[500px]"
              aria-label="Cerca un termine"
            />
          </label>
        </div>

        <ul className="mx-auto relative mb-[-1px] max-w-[1400px] flex flex-wrap text-center font-sans dark:text-gray-400 pt-14 md:pl-8">
          <li className="mr-2 min-w-80">
            <Link
              href={getTabUrl(router, null)}
              scroll={false}
              aria-current="page"
              className={classNames(
                "inline-block p-4 tab-mobile transition-none",
                {
                  [selectedTabClass]: !filterCategory,
                }
              )}
            >
              Tutti ({totalResults})
            </Link>
          </li>

          <li className="mr-2 min-w-80">
            <Link
              href={getTabUrl(router, "rsnd")}
              scroll={false}
              aria-current="page"
              className={classNames(
                "inline-block p-4 tab-mobile transition-none",
                {
                  [selectedTabClass]: filterCategory === GLOSSARY_RSND_CAT_ID,
                  "text-gray-400 pointer-events-none cursor-not-allowed":
                    rsndResults === 0,
                }
              )}
            >
              <span className="hidden lg:inline">
                Raccolta degli Scritti di Nichiren Daishonin
              </span>
              <span className="lg:hidden">RSND</span>
              <span> ({rsndResults})</span>
            </Link>
          </li>

          <li className="mr-2 min-w-80">
            <Link
              href={getTabUrl(router, "sdl")}
              scroll={false}
              aria-current="page"
              className={classNames(
                "inline-block p-4 tab-mobile transition-none",
                {
                  [selectedTabClass]: filterCategory === GLOSSARY_SDL_CAT_ID,
                  "text-gray-400 pointer-events-none cursor-not-allowed":
                    sdlResults === 0,
                }
              )}
            >
              <span className="hidden md:inline">Il Sutra del Loto</span>
              <span className="md:hidden">SDL</span>
              <span> ({sdlResults})</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="pb-14 lg:pb-32 mb-14">
        <div className="mx-auto border-b border-gray-400 bg-white px-8 py-8 md:py-14 shadow-md rounded-3xl">
          {dictionaryToShow.length === 0 && (
            <div className="mb-10 mx-auto md:max-w-5xl px-4 md:px-10 py-8">
              <div className="font-bold text-xl ">
                Non abbiamo trovato nessun risultato
              </div>
              <button className="font-sans text-primary" onClick={clearFilters}>
                Rimuovi filtri
              </button>
            </div>
          )}
          {dictionaryToShow.length !== 0 && (
            <>
              <ul className="divide-y-2 divide-dashed mb-10 mx-auto md:max-w-6xl border-b border-gray-200 dark:border-gray-700 bg-defaultBg rounded-3xl shadow-md  px-4 md:px-10 py-4">
                {dictionaryToShow.map((glossarioRicerca) => (
                  <li className="py-6" key={glossarioRicerca.id}>
                    <button className="text-left">
                      <div
                        className="first-letter font-bold font-bold pb-4 text-lg md:text-xl"
                        dangerouslySetInnerHTML={{
                          __html: glossarioRicerca.title,
                        }}
                      ></div>
                    </button>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: glossarioRicerca.content,
                      }}
                      className="result lg:mr-20 font-medium text-md md:text-lg"
                    ></div>

                    <div className="font-sans mt-4 uppercase text-md md:text-lg text-primary">
                      {glossarioRicerca.cat.includes(GLOSSARY_RSND_CAT_ID)
                        ? "Raccolta degli scritti di Nichiren"
                        : "Il Sutra del Loto"}
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination
                totalResults={glossarioFilteredByCategory.length}
                anchorHash="risultati"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DictionarySearch;
