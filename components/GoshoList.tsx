import Link from "next/link";
import * as React from "react";
import SearchInput from "./SearchInput";
import Select from "./Select";
import { unescape } from "underscore";
import Pagination from "./Pagination";
import Fuse from "fuse.js";

type GoshoListProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonData: any;
};

const generateRecipients = (jsonData) => {
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

const alphabeticOrderFunction = (a, b) =>
  a.title > b.title ? 1 : -1;

const chronologicalOrder = (a, b) =>
  a.data > b.data ? 1 : -1;

const GoshoList: React.FC<GoshoListProps> = ({ jsonData }) => {
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
<<<<<<< Updated upstream
    () =>
      fuzzy.filter(titleFilter, jsonData, {
        extract: (el: { title: string; destinatario: string; slug: string }) =>
          unescape(el.title)
      }),
=======
    () => {
      if (!titleFilter) return jsonData

      const fuse = new Fuse(jsonData,  { keys: [
        "title",
      ]});

      return fuse.search(titleFilter).map(result => result.item as any)
    },
>>>>>>> Stashed changes
    [titleFilter, jsonData]
  );

  const goshoFilteredByRecipient = recipient
    ? goshoFilteredByTitle.filter(
        (gosho) =>
          gosho.destinatario === recipientOptions[recipient].label
      )
    : goshoFilteredByTitle;

  let goshoOrdered;

  if (titleFilter && !alphabeticOrder) {
    goshoOrdered = goshoFilteredByRecipient;
  } else {
    goshoOrdered = goshoFilteredByRecipient.sort(
      alphabeticOrder ? alphabeticOrderFunction : chronologicalOrder
    );
  }

  return (
    <section className="bg-white" id="gosho-list">
      <div className="container mx-auto py-8 min-h-[50vh]">
        <h2 className="text-4xl md:text-5xl text-secondary mb-8">Scritti</h2>
        <form className="border-b-2 border-secondary pb-2 flex items-center justify-between flex-wrap">
          <label className="mb-4">
            <span className="mr-4">Titolo</span>
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
<<<<<<< Updated upstream
            <Pagination
              totalResults={goshoOrdered.length}
              array={goshoOrdered}
              anchorHash="gosho-list"
              renderer={({ original: post }, index) => (
                <li key={post.slug} className="py-3">
                  <Link href={`/posts/${post.slug}`}>
                    <a className="flex">
                      <span className="mr-8 lg:mr-14">{index + 1}.</span>{" "}
                      <span>{post.title}</span>
                    </a>
                  </Link>
                </li>
              )}
            />
=======
            {goshoOrdered.map((post, index) => (
              <li key={post.slug} className="py-3">
                <Link href={`/posts/${post.slug}`}>
                  <a className="flex">
                    <span className="mr-8 lg:mr-14">{index + 1}.</span>{" "}
                    <span>{post.title}</span>
                  </a>
                </Link>
              </li>
            ))}
>>>>>>> Stashed changes
          </ul>
        )}
      </div>
    </section>
  );
};

export default GoshoList;
