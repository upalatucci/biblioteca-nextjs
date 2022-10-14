import React, { useCallback, useEffect, useRef } from "react";
import SearchInput from "../SearchInput";
import Select from "../Select";
import Pagination from "../Pagination/Pagination";
import Fuse from "fuse.js";
import { createFuzzyIndex } from "@utils/fuzzySearch";
import GoshoListTable from "./GoshoListTable";
import { usePagination } from "@components/Pagination";

const generateRecipients = (jsonData: GoshoType[]) => {
  const recipientOptions = [{ value: 0, label: "Tutti" }];
  const allRecipients = new Set<string>(
    jsonData.map((post) => post.destinatario)
  );

  allRecipients.forEach((recipient) => {
    if (recipient)
      recipientOptions.push({
        value: recipientOptions.length,
        label: recipient,
      });
  });

  return recipientOptions;
};

const alphabeticOrderFunction = (a: GoshoType, b: GoshoType) =>
  a.title > b.title ? 1 : -1;

const chronologicalOrder = (a: GoshoType, b: GoshoType) =>
  a.data > b.data ? 1 : -1;

export type GoshoType = {
  title: string;
  slug: string;
  destinatario: string;
  luogo: string;
  data: string;
};

type GoshoListProps = {
  jsonData: GoshoType[];
};

const GoshoList: React.FC<GoshoListProps> = ({ jsonData }) => {
  const recipientOptions = React.useMemo(
    () => generateRecipients(jsonData),
    [jsonData]
  );

  const fuseRef = useRef<Fuse<GoshoType>>();
  const [alphabeticOrder, setAlphabeticOrder] = React.useState(false);
  const [titleFilter, setTitleFilter] = React.useState("");
  const [recipient, setRecipient] = React.useState<string | number>(
    recipientOptions[0].value
  );

  useEffect(() => {
    fuseRef.current = createFuzzyIndex<GoshoType>(jsonData);
  }, [jsonData]);

  const clearFilters = useCallback(() => {
    setTitleFilter("");
    setRecipient(recipientOptions[0].value);
  }, []);

  const goshoFilteredByTitle = React.useMemo(() => {
    if (!titleFilter || !fuseRef.current) return jsonData;

    return fuseRef.current?.search(titleFilter).map((result) => result.item);
  }, [titleFilter, jsonData]);

  const goshoFilteredByRecipient = recipient
    ? goshoFilteredByTitle.filter(
        (gosho) => gosho.destinatario === recipientOptions[recipient].label
      )
    : goshoFilteredByTitle;

  let goshoOrdered: GoshoType[];

  if (titleFilter && !alphabeticOrder) {
    goshoOrdered = goshoFilteredByRecipient;
  } else {
    goshoOrdered = goshoFilteredByRecipient.sort(
      alphabeticOrder ? alphabeticOrderFunction : chronologicalOrder
    );
  }

  const goshoToShow = usePagination(goshoOrdered);

  return (
    <section className="bg-white" id="gosho-list">
      <div className="container mx-auto px-4 py-8 min-h-[50vh]">
        <h2 className="text-4xl md:text-5xl text-secondary mb-8">Scritti</h2>
        <form className="border-b-2 border-secondary flex items-start flex-col md:flex-row md:items-center justify-between flex-wrap gap-4 pb-4">
          <label className="flex-1">
            <span className="mr-4 font-bold">Titolo</span>
            <SearchInput
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Inserisci il titolo del Gosho che stai cercando"
            />
          </label>
          <label className="flex items-center flex-wrap">
            <span className="mr-4">Destinatario</span>
            <Select
              onChange={setRecipient}
              value={recipient}
              name="destinatario"
              options={recipientOptions}
              className="w-64"
            />
          </label>
          <label className="">
            <span className="mr-4">Ordine alfabetico</span>
            <input
              type="checkbox"
              value="alphabeticOrder"
              checked={alphabeticOrder}
              onChange={(e) => setAlphabeticOrder(e.currentTarget.checked)}
            />
          </label>
        </form>
        {goshoOrdered.length === 0 && (
          <div>
            <div className="mt-4 mb-2 text-3xl">
              Nessun risultato per questo tipo di ricerca
            </div>
            <button className="font-sans text-primary" onClick={clearFilters}>
              Rimuovi filtri
            </button>
          </div>
        )}
        {goshoOrdered.length > 0 && (
          <>
            <GoshoListTable items={goshoToShow} />
            <Pagination
              totalResults={goshoOrdered.length}
              anchorHash="gosho-list"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default GoshoList;
