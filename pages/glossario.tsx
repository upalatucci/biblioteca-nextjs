import Head from "next/head";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import { useState } from "react";
import glossario from "../books/glossario.json";
import SearchInput from "../components/SearchInput";
import classNames from "classnames";

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

type RicercaGlossarioProps = {
  filterText: string;
  lettera: string;
};
const RicercaGlossario: React.FC<RicercaGlossarioProps> = ({
  lettera,
  filterText,
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
    <ul className="divide-y-2 divide-gray-200 divide-dashed">
      {glossarioFiltrato?.map((glossarioRicerca) => (
        <li className="py-4" key={glossarioRicerca.title}>
          <span
            className="font-bold text-lg"
            dangerouslySetInnerHTML={{ __html: glossarioRicerca.title }}
          ></span>
        </li>
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

      <div>
        <HomeNavbar />

        <section className="bg-white">
          <div className="container mx-auto py-8 px-4">
            <h2 className="text-4xl md:text-5xl px-4 font-bold mb-8">Glossario</h2>
            <form className="flex flex-col flex-wrap">
              <div className="mb-4 flex items-stretch lg:items-center justify-between flex-wrap flex-col xl:flex-row">
                <label className="bg-defaultBg shadow-md px-8 py-4 rounded-xl mb-6 md:flex w-full xl:w-auto">
                  <span className="text-primary font-bold text-xl">Filtra i risultati per:</span>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-start ml-4 md:ml-0 ">
                  <label className="md:ml-6">
                    <input type="checkbox" className="mr-4" />
                    <span>RSND vol. I/II</span>
                  </label>
                  <label className="md:ml-6">
                    <input type="checkbox" className="mr-4" />
                    <span>Il Sutra del Loto</span>
                  </label>
                  </div>
                </label>
                <div className="hidden xl:block mb-6 h-8 w-1 border-r-2 border-gray-100"></div>
                <div className="mb-6 self-center">
                  <label>
                    <span className="font-bold text-xl mr-4">Cerca un termine</span>
                    <SearchInput
                      onChange={(e) => setRicercaTesto(e.currentTarget.value)}
                      value={ricercaTesto}
                      placeholder="Inserisci la parola che stai cercando"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {alfabeto.map((lettera) => (
                  <button
                    key={lettera}
                    className={classNames(
                      "h-10 w-10 rounded-2xl border-secondary border",
                      {
                        "bg-secondary text-white":
                          letteraSelezionata === lettera,
                      }
                    )}
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
            </form>

            <RicercaGlossario
              lettera={letteraSelezionata}
              filterText={ricercaTesto}
            />
          </div>
        </section>
      </div>
    </>
  );
}
