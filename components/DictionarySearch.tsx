import React, { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import DictionarySkeleton from "@components/DictionarySkeleton";
import { createFuzzyIndex } from "@utils/fuzzySearch";
import Pagination, { usePagination } from "./Pagination";
import { GLOSSARY_RSND_CAT_ID, GLOSSARY_SDL_CAT_ID } from "@utils/constants";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

type DictionaryItem = {
  title: string;
  content: string;
  cat: number[];
};

type DictionarySearchProps = {
  filterText: string;
  letter: string;
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
  "font-bold text-black !bg-white border border-gray-200 rounded-t-xl border-b-0 relative top-[0.5px]";

const DictionarySearch: React.FC<DictionarySearchProps> = ({
  letter,
  filterText,
  clearFilters,
}) => {
  const router = useRouter();

  const filterCategory = getCategoryFromBook(router.query.book as string);
  const [glossario, setGlossario] = useState<DictionaryItem[]>();
  const fuseRef = useRef<Fuse<DictionaryItem>>();

  useEffect(() => {
    import("../books/glossario.json").then((fetchedDictionary) => {
      fuseRef.current = createFuzzyIndex<DictionaryItem>(
        fetchedDictionary.default
      );
      setGlossario(fetchedDictionary.default);
    });
  }, []);

  let glossarioFiltrato: DictionaryItem[];

  if (filterText) {
    glossarioFiltrato = fuseRef.current
      ?.search(filterText)
      .map((result) => result.item);
  } else if (letter) {
    glossarioFiltrato = glossario?.filter((termine) =>
      termine?.title?.charAt(0).toUpperCase().startsWith(letter)
    );
  } else {
    glossarioFiltrato = glossario;
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

  if (!glossario) {
    return <DictionarySkeleton />;
  }

  return (
    <div className="" id="risultati">
      <h3 className="text-2xl font-bold text-primary mx-auto px-8 md:px-20 xl:px-0 md:max-w-6xl mb-10">
        Abbiamo trovato
      </h3>
      <ul className="flex items-stretch text-sm font-medium text-center font-sans text-gray-500  dark:text-gray-400 mx-auto px-8 md:px-20 xl:px-0 md:max-w-6xl w-full">
        <li className="mr-4">
          <Link href="/glossario#risultati">
            <a
              aria-current="page"
              className={classNames("inline-block p-4 h-full", {
                [selectedTabClass]: !filterCategory,
              })}
            >
              Tutti ({totalResults})
            </a>
          </Link>
        </li>

        <li className="mr-4">
          <Link href="/glossario/rsnd#risultati">
            <a
              aria-current="page"
              className={classNames("inline-block p-4 h-full", {
                [selectedTabClass]: filterCategory === GLOSSARY_RSND_CAT_ID,
                "text-gray-400 pointer-events-none cursor-not-allowed":
                  rsndResults === 0,
              })}
            >
              <span className="hidden md:inline">
                Raccolta degli Scritti di Nichiren Daishonin
              </span>
              <span className="md:hidden">RSND</span>
              <span> ({rsndResults})</span>
            </a>
          </Link>
        </li>

        <li className="mr-4">
          <Link href="/glossario/sdl#risultati">
            <a
              aria-current="page"
              className={classNames("inline-block p-4 h-full", {
                [selectedTabClass]: filterCategory === GLOSSARY_SDL_CAT_ID,
                "text-gray-400 pointer-events-none cursor-not-allowed":
                  sdlResults === 0,
              })}
            >
              <span className="hidden md:inline">Il Sutra del Loto</span>
              <span className="md:hidden">SDL</span>
              <span> ({sdlResults})</span>
            </a>
          </Link>
        </li>
      </ul>
      <div className="bg-white border-t border-gray-200 dark:border-gray-700 py-20">
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
            <ul className="divide-y-2 divide-dashed mb-10 mx-auto md:max-w-6xl border-b border-gray-200 dark:border-gray-700 bg-defaultBg rounded-xl shadow-md  px-4 md:px-10 py-8">
              {dictionaryToShow.map((glossarioRicerca) => (
                <li
                  className="py-4"
                  key={`${glossarioRicerca.title}-${glossarioRicerca.cat?.[0]}`}
                >
                  <button className="text-left">
                    <div
                      className="font-bold text-lg mb-4"
                      dangerouslySetInnerHTML={{
                        __html: glossarioRicerca.title,
                      }}
                    ></div>
                  </button>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: glossarioRicerca.content,
                    }}
                    className="mb-4"
                  ></div>

                  <div className="mb-2 text-primary">
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
  );
};

export default DictionarySearch;
