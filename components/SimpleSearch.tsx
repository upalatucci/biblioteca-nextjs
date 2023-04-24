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
    <div className="w-full bg-white rounded-3xl shadow-md py-14 lg:py-32 px-8 mb-14">
      <form onSubmit={onSubmit} className="mx-auto max-w-[1400px]">
        <section className="">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl pb-10 md:px-0 font-bold">
              Cosa vuoi approfondire oggi?
            </h2>

            <div className="font-sans rounded-3xl bg-defaultBg p-8 md:p-10 shadow-md flex flex-col items-center justify-evenly gap-20">
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                required
                aria-label="Cerca parole o frase"
                withSuggestions
              />
              <div className="w-full flex flex-wrap gap-4 items-center justify-center">
                <button
                  className="btn font-sans bg-primary hover:bg-primaryHover rounded-3xl w-full sm:w-1/3 h-10 text-white text-lg"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    {loading && <Loading />}
                    Cerca
                  </div>
                </button>

                <Link
                  href="/ricerca-avanzata"
                  passHref
                  className=" h-10 flex justify-center items-center btn border border-primary text-primary hover:bg-white rounded-3xl text-center text-lg font-sans py-2 w-full sm:w-1/3 whitespace-pre"
                >
                  Ricerca avanzata
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
