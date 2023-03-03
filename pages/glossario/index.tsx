import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import { FormEventHandler, useEffect, useState } from "react";
import SearchInput from "@components/SearchInput";
import classNames from "classnames";
import Footer from "@components/Footer";
import DictionarySearch from "@components/DictionarySearch";
import { useRouter } from "next/router";

const alfabeto = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

export default function Glossario() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchText, setSearchText] = useState("");

  const clearFilters = () => {
    setSelectedLetter("");
    setSearchText("");
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    router.push({ ...router, query: { ...router.query, q: searchText } });
  };

  useEffect(() => {
    setSearchText(router?.query?.q as string);
  }, [router?.query?.q]);

  return (
    <>
      <Head>
        <title>Glossario | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main>
        <section className="bg-defaultBg" id="glossario-cerca">
          <div className="bg-white shadow-md rounded-3xl py-20 mb-20 lg:py-32 px-8">
            <div className="mx-auto max-w-[1400px]">
              <h2 className="text-3xl font-bold mb-8">Glossario</h2>
              <form
                className="bg-defaultBg shadow-md rounded-3xl px-10 py-14 flex flex-col flex-wrap font-sans"
                onSubmit={onSubmit}
              >
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
          <DictionarySearch
            letter={selectedLetter}
            filterText={searchText}
            clearFilters={clearFilters}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
