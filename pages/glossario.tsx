import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import { useState } from "react";
import SearchInput from "@components/SearchInput";
import classNames from "classnames";
import Footer from "@components/Footer";
import DictionarySearch from "@components/DictionarySearch";

const alfabeto = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

export default function Glossario() {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchText, setSearchText] = useState("");
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
                      onChange={(e) => setSearchText(e.currentTarget.value)}
                      value={searchText}
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
                        "bg-secondary text-white": selectedLetter === lettera,
                      }
                    )}
                    onClick={() =>
                      lettera === selectedLetter
                        ? setSelectedLetter("")
                        : setSelectedLetter(lettera)
                    }
                  >
                    {lettera}
                  </button>
                ))}
              </div>
            </form>

            <hr className="border border-secondary mt-6" />
            <DictionarySearch letter={selectedLetter} filterText={searchText} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
