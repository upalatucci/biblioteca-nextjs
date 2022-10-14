import React, { useState, useRef, useEffect } from "react";
import Pagination from "@components/Pagination";
import Fuse from "fuse.js";
import DictionarySkeleton from "@components/DictionarySkeleton";
import { createFuzzyIndex } from "@utils/fuzzySearch";

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

  if (!glossario) {
    return <DictionarySkeleton />;
  }

  let glossarioFiltrato;

  if (filterText) {
    glossarioFiltrato = fuseRef.current
      .search(filterText)
      .map((result) => result.item);
  } else if (letter) {
    glossarioFiltrato = glossario.filter((termine) =>
      termine?.title?.charAt(0).toUpperCase().startsWith(letter)
    );
  } else {
    glossarioFiltrato = glossario;
  }

  return (
    <ul className="divide-y-2 divide-gray-200 divide-dashed mt-4">
      <Pagination
        totalResults={glossarioFiltrato.length}
        array={glossarioFiltrato}
        renderer={(glossarioRicerca) => (
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
        )}
      />
    </ul>
  );
};

export default DictionarySearch;
