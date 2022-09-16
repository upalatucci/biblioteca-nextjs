import Link from "next/link";
import * as React from "react";
import SearchInput from "./SearchInput";
import Select from "./Select";

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

const alphabeticOrderFunction = (a, b) => (a.title > b.title ? 1 : -1);

const chronologicalOrder = (a, b) => (a.data > b.data ? 1 : -1);

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

  const goshoFilteredByTitle = jsonData.filter((post) =>
    post.title.toLowerCase().includes(titleFilter.toLocaleLowerCase())
  );

  const goshoFilteredByRecipient = recipient
    ? goshoFilteredByTitle.filter(
        (gosho) => gosho.destinatario === recipientOptions[recipient].label
      )
    : goshoFilteredByTitle;

  const goshoOrdered = goshoFilteredByRecipient.sort(
    alphabeticOrder ? alphabeticOrderFunction : chronologicalOrder
  );

  return (
    <section className="blank-section">
      <div className="gosho-list-section container">
        <h2>Scritti</h2>
        <form>
          <label>
            Titolo
            <SearchInput
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Inserisci il titolo del Gosho che stai cercando"
            />
          </label>
          <label>
            Destinatario
            <Select
              onChange={setRecipient}
              value={recipient}
              name="destinatario"
              options={recipientOptions}
            />
          </label>
          <label>
            Ordine alfabetico
            <input
              type="checkbox"
              value="alphabeticOrder"
              checked={alphabeticOrder}
              onChange={(e) => setAlphabeticOrder(e.currentTarget.checked)}
            />
          </label>
        </form>
        <ul className="gosho-list">
          {goshoOrdered.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GoshoList;
