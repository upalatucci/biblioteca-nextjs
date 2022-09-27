import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
import Footer from "../components/Footer";
import ResultsLoading from "../components/ResultsLoading";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import Results from "../components/Results";
import {
  mapElasticResultToPost,
  PostResultType
} from "../utils/elasticSearchUtils";

export default function Ricerca() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();
  const [totalResults, setTotalResults] = useState<number>();

  const onSearch = useCallback(async () => {
    setSearchedPosts(undefined);
    setLoading(true);

    const response = await fetch(`/api/search${location.search}`);

    const jsonResponse = await response.json();

    setSearchedPosts(mapElasticResultToPost(jsonResponse));
    setTotalResults(jsonResponse?.hits?.total?.value);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (router.query.q && router.query.sources && router.query.fields) {
      onSearch();
    }
  }, [onSearch, router.query]);

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <HomeNavbar />
      <main className="search-page">
        <AdvancedSearch />
        {loading && <ResultsLoading />}
        {searchedPosts !== undefined && (
          <Results data={searchedPosts} totalResults={totalResults} />
        )}
      </main>
      <Footer />
    </>
  );
}
