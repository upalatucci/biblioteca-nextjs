import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import SearchInput from "./SearchInput";
import Select from "./Select";
import Pagination from "./Pagination";
import Fuse from "fuse.js";


const generateRecipients = (jsonData: GoshoType[]) => {
  const recipientOptions = [{ value: 0, label: "Tutti" }];
  const allRecipients = new Set<string>(
    jsonData.map((post) => post.destinatario)
  );

  allRecipients.forEach((recipient) => {
    if (recipient)
      recipientOptions.push({
        value: recipientOptions.length,
        label: recipient
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
}


type GoshoListProps = {
  jsonData: GoshoType[];
};

const GoshoList: React.FC<GoshoListProps> = ({ jsonData }) => {
  const fuseRef = useRef<Fuse<GoshoType>>()

  useEffect(() => {
    fuseRef.current = new Fuse(jsonData, { keys: [
      "title",
    ]});
  }, [jsonData])

  const recipientOptions = React.useMemo(
    () => generateRecipients(jsonData),
    [jsonData]
  );

  const [alphabeticOrder, setAlphabeticOrder] = React.useState(false);

  const [titleFilter, setTitleFilter] = React.useState("");
  const [recipient, setRecipient] = React.useState<string | number>(
    recipientOptions[0].value
  );

  const goshoFilteredByTitle = React.useMemo(
    () => {
      if (!titleFilter || !fuseRef.current) return jsonData

      return fuseRef.current?.search(titleFilter).map(result => result.item)
    },
    [titleFilter, jsonData]
  );

  const goshoFilteredByRecipient = recipient
    ? goshoFilteredByTitle.filter(
        (gosho) =>
          gosho.destinatario === recipientOptions[recipient].label
      )
    : goshoFilteredByTitle;

  const goshoOrdered  = goshoFilteredByRecipient.sort(
    alphabeticOrder ? alphabeticOrderFunction : chronologicalOrder
  );

  return (
    <section className="bg-white" id="gosho-list">
      <div className="container mx-auto px-4 py-8 min-h-[50vh]">
        <h2 className="text-4xl md:text-5xl text-secondary mb-8">Scritti</h2>
        <form className="border-b-2 border-secondary pb-2 flex items-center justify-between flex-wrap">
          <label className="mb-4">
            <span className="mr-4 font-bold">Titolo</span>
            <SearchInput
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Inserisci il titolo del Gosho che stai cercando"
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="mr-4">Destinatario</span>
            <Select
              onChange={setRecipient}
              value={recipient}
              name="destinatario"
              options={recipientOptions}
              className='w-64'
            />
          </label>
          <label className="mb-4">
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
          <div className="mt-4 text-3xl">
            Nessun risultato per questo tipo di ricerca
          </div>
        )}
        {goshoOrdered.length > 0 && (
          <ul className="mt-4 divide-y-2 divide-gray-300 divide-dashed text-xl">
            <Pagination
              totalResults={goshoOrdered.length}
              array={goshoOrdered}
              anchorHash="gosho-list"
              renderer={(post, index) => (
                <li key={post.slug} className="py-3">
                <Link href={`/posts/${post.slug}`}>
                  <a className="flex hover:text-primary">
                    <span className="mr-8 lg:mr-14">{index + 1}.</span>{" "}
                    <span>{post.title}</span>
                  </a>
                </Link>
              </li>
              )}
            />
          </ul>
        )}
      </div>
    </section>
  );
};

export default GoshoList;
