import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Loading from "./Loading";

type SimpleSearchType = {
  loading: boolean;
};

const SimpleSearch: FC<SimpleSearchType> = ({ loading }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.q as string);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!searchText) return;

    router.query.q = searchText;
    router.push({ ...router, hash: "risultati" });
  };

  useEffect(() => {
    const searchQueryString = router.query.q as string;
    if (searchQueryString) {
      setSearchText(searchQueryString);
    }
  }, [router.query.q]);

  return (
    <div className="bg-white py-14 rounded-xl shadow-md mb-20">
      <form onSubmit={onSubmit} className="mx-auto max-w-6xl pb-10 mb-10">
        <section className="font-sans">
          <div className="container mx-auto">
            <h2 className="text-3xl px-4 md:px-0 font-bold">
              Cosa vuoi approfondire oggi?
            </h2>

            <div className="rounded-2xl bg-defaultBg p-4 md:p-8 my-14 shadow-md flex flex-col items-center justify-evenly h-80">
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
                aria-label="Cerca parole o frase"
              />
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <button
                  className="btn font-sans bg-primary hover:bg-primaryHover rounded-3xl w-40 md:w-44 h-10 text-white text-lg mx-4"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    {loading && <Loading />}
                    Cerca
                  </div>
                </button>

                <Link href="/ricerca-avanzata" passHref>
                  <a className="btn border-customYellow border-2 text-customYellow hover:bg-customYellow hover:text-white font-bold rounded-3xl text-center font-sans py-2 w-40 md:w-44 whitespace-pre">
                    Ricerca avanzata
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SimpleSearch;
