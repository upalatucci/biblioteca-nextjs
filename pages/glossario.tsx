import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import { useEffect, useRef, useState } from "react";
import SearchInput from "@components/SearchInput";
import classNames from "classnames";
import Footer from "@components/Footer";
import Pagination from "@components/Pagination";
import Fuse from "fuse.js";
import DictionarySkeleton from "@components/DictionarySkeleton";


const alfabeto = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
type RicercaGlossarioProps = {
  filterText: string;
  lettera: string;
};

type DictionaryItem = {
  title: string;
  content: string;
}

const RicercaGlossario: React.FC<RicercaGlossarioProps> = ({
  lettera,
  filterText
}) => {
  const [glossario, setGlossario] = useState<DictionaryItem[]>()
  const fuseRef = useRef<Fuse<DictionaryItem>>()

  useEffect(() => {
    import("../books/glossario.json").then(fetchedDictionary => {
      const fuse = new Fuse(fetchedDictionary.default,  { keys: [
        "title",
      ]});
  
      fuseRef.current = fuse
      setGlossario(fetchedDictionary.default)
    })
  }, [])

  if (!glossario) {
    return <DictionarySkeleton />
  }

  let glossarioFiltrato


  if (filterText) {
    glossarioFiltrato = fuseRef.current.search(filterText).map(result => result.item)
  } else if (lettera) {
    glossarioFiltrato = glossario.filter((termine) =>
      termine?.title?.charAt(0).toUpperCase().startsWith(lettera)
    );
  } else {
    glossarioFiltrato = glossario
  }

  return (
    <ul className="divide-y-2 divide-gray-200 divide-dashed mt-4">
      <Pagination
        totalResults={glossarioFiltrato.length}
        array={glossarioFiltrato}
        renderer={(glossarioRicerca) => (
            <li className="py-4" key={glossarioRicerca.title}>
              <span
                className="font-bold text-lg"
                dangerouslySetInnerHTML={{ __html: glossarioRicerca.title }}
              ></span>
            </li>          
        )}
      />
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

      <HomeNavbar />
      <main>
        <section className="bg-white">
          <div className="container mx-auto py-8 px-4">
            <h2 className="text-4xl md:text-5xl px-4 font-bold mb-8">
              Glossario
            </h2>
            <form className="flex flex-col flex-wrap font-sans">
              <div className="mb-4 flex items-stretch lg:items-center justify-between flex-wrap flex-col xl:flex-row">
                <label className="bg-defaultBg shadow-md px-8 py-4 rounded-xl mb-6 md:flex w-full xl:w-auto">
                  <span className="text-primary font-bold text-xl">
                    Filtra i risultati per:
                  </span>

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
                    <span className="font-bold text-xl mr-4">
                      Cerca un termine
                    </span>
                    <SearchInput
                      onChange={(e) => setRicercaTesto(e.currentTarget.value)}
                      value={ricercaTesto}
                      placeholder="Inserisci la parola che stai cercando"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center xl:justify-between gap-1">
                {alfabeto.map((lettera) => (
                  <button
                    type="button"
                    key={lettera}
                    className={classNames(
                      "h-10 w-10 rounded-2xl border-secondary border",
                      {
                        "bg-secondary text-white":
                          letteraSelezionata === lettera
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

            <hr className="border border-secondary mt-6" />
            <RicercaGlossario
              lettera={letteraSelezionata}
              filterText={ricercaTesto}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
