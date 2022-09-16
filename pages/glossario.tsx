import Head from "next/head";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import { useState } from "react";
import glossario from "../books/glossario.json";
import SearchInput from "../components/SearchInput";

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

type RicercaGlossarioProps = {
  filterText: string;
  lettera: string;
};
const RicercaGlossario: React.FC<RicercaGlossarioProps> = ({
  lettera,
  filterText
}) => {
  let glossarioFiltrato = glossario;

  if (filterText) {
    glossarioFiltrato = glossarioFiltrato.filter((termine) =>
      termine?.title?.toLowerCase().includes(filterText.toLowerCase())
    );
  } else if (lettera) {
    glossarioFiltrato = glossarioFiltrato.filter((termine) =>
      termine?.title?.toLowerCase().startsWith(lettera)
    );
  }

  return (
    <ul>
      {glossarioFiltrato?.map((glossarioRicerca) => (
        <li
          dangerouslySetInnerHTML={{ __html: glossarioRicerca.title }}
          key={glossarioRicerca.title}
        />
      ))}
    </ul>
  );
};

export default function Glossario() {
  const [letteraSelezionata, setLetteraSelezionata] = useState("");
  const [ricercaTesto, setRicercaTesto] = useState("");
  return (
    <>
      <Head>
        <title>NICHIREN Library | Glossario</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />

        <div className="filtri-glossario">
          <label>
            <SearchInput
              onChange={(e) => setRicercaTesto(e.currentTarget.value)}
              value={ricercaTesto}
              placeholder="Inserisci la parola che stai cercando"
            />
          </label>
        </div>
        <div className="lettere-glossario">
          {alfabeto.map((lettera) => (
            <button
              key={lettera}
              className={`lettera  ${
                letteraSelezionata === lettera ? "selected" : ""
              }`}
              onClick={() =>
                lettera === letteraSelezionata
                  ? setLetteraSelezionata("")
                  : setLetteraSelezionata(lettera)
              }
            >
              {lettera}
            </button>
          ))}
        </div>

        <RicercaGlossario
          lettera={letteraSelezionata}
          filterText={ricercaTesto}
        />
      </div>
    </>
  );
}
