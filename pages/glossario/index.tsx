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
        <title>Glossario | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main>
        <section className="bg-defaultBg" id="glossario-cerca">
          <div className="bg-white shadow-md rounded-xl p-8 md:p-20 mb-20">
            <div className="mx-auto md:max-w-6xl">
              <h2 className="text-3xl font-bold mb-8">Glossario</h2>
              <form className="bg-defaultBg shadow-md rounded-xl px-10 py-14 flex flex-col flex-wrap font-sans">
                <div className="mb-4 flex items-stretch lg:items-center justify-between flex-wrap flex-col xl:flex-row">
                  <label className="flex w-full items-center mb-6">
                    <span className="font-bold mr-4">Cerca un termine</span>
                    <SearchInput
                      onChange={(e) => setSearchText(e.currentTarget.value)}
                      value={searchText}
                      placeholder="Inserisci la parola che stai cercando"
                      className="!bg-white border-primary"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center justify-center xl:justify-between gap-1">
                  {alfabeto.map((lettera) => (
                    <button
                      type="button"
                      key={lettera}
                      className={classNames(
                        "h-8 w-8 rounded-xl border-primary border bg-white",
                        {
                          "bg-gray-50 text-gray-400 border-gray-400":
                            selectedLetter === lettera,
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
            </div>
          </div>
          <DictionarySearch letter={selectedLetter} filterText={searchText} />
        </section>
      </main>
      <Footer />
    </>
  );
}
