import React, { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import DictionarySkeleton from "@components/DictionarySkeleton";
import { createFuzzyIndex } from "@utils/fuzzySearch";
import Pagination, { usePagination } from "./Pagination";

type DictionaryItem = {
  title: string;
  content: string;
};

type DictionarySearchProps = {
  filterText: string;
  letter: string;
};

const DictionarySearch: React.FC<DictionarySearchProps> = ({
  letter,
  filterText,
}) => {
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

  const dictionaryToShow = usePagination(glossarioFiltrato);

  if (!glossario) {
    return <DictionarySkeleton />;
  }

  return (
    <>
      <ul className="divide-y-2 divide-dashed pt-4 mb-10">
        {dictionaryToShow.map((glossarioRicerca) => (
          <li className="py-4" key={glossarioRicerca.title}>
            <button className="text-left">
              <div
                className="font-bold text-lg"
                dangerouslySetInnerHTML={{ __html: glossarioRicerca.title }}
              ></div>
              <div className="mb-2">Raccolta degli scritti di Nichiren I</div>
            </button>
            <div
              dangerouslySetInnerHTML={{ __html: glossarioRicerca.content }}
            ></div>
          </li>
        ))}
      </ul>
      <Pagination
        totalResults={glossarioFiltrato.length}
        anchorHash="dictionary"
      />
    </>
  );
};

export default DictionarySearch;
