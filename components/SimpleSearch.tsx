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
    <div className="w-full bg-white rounded-3xl shadow-md py-20 lg:py-32 px-8">
      <form onSubmit={onSubmit} className="mx-auto max-w-[1400px] pb-10">
        <section className="">
          <div className="container mx-auto">
            <h2 className="text-4xl pt-4 pb-10 md:px-0 font-bold">
              Cosa vuoi approfondire oggi?
            </h2>
          
            <div className="rounded-3xl bg-defaultBg p-4 md:p-8 shadow-md flex flex-col items-center justify-evenly h-80">
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
                aria-label="Cerca parole o frase"
              />
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <button
                  className="btn font-sans bg-primary hover:bg-primaryHover rounded-3xl w-50 md:w-44 h-10 text-white text-lg mx-4"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    {loading && <Loading />}
                    Cerca
                  </div>
                </button>

                <Link href="/ricerca-avanzata" passHref>
                  <a className=" h-10 flex justify-center items-center btn border border-primary text-primary hover:bg-white rounded-3xl text-center text-lg font-sans py-2 w-50 md:w-44 whitespace-pre">
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
