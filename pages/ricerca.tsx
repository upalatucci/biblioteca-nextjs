import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import Results from "../components/Results";
import SimpleSearch from "../components/SimpleSearch";
import {
  mapElasticResultToPost,
  PostResultType,
} from "../utils/elasticSearchUtils";

export default function Ricerca() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();
  const router = useRouter();

  const onSearch = useCallback(async () => {
    setSearchedPosts(undefined);
    setLoading(true);

    try {
      const response = await fetch(`/api/simple_search${location.search}`);

      const jsonResponse = await response.json();

      setSearchedPosts(mapElasticResultToPost(jsonResponse));
    } catch (apiError) {
      setError("Si e' verificato un errore durante la ricerca");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (router.query.q) onSearch();
  }, [onSearch, router.query]);

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <HomeNavbar />
      <main>
        <SimpleSearch />
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative container mx-auto my-4"
            role="alert"
          >
            <div>
              <strong className="font-bold">Errore</strong>
            </div>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                onClick={() => setError(null)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        {loading && <Loading />}
        {searchedPosts !== undefined && <Results data={searchedPosts} />}
      </main>
      <Footer />
    </>
  );
}
