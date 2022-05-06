import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
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
  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();
  const router = useRouter();

  const onSearch = useCallback(async () => {
    setSearchedPosts(undefined);
    setLoading(true);

    const response = await fetch(`/api/simple_search${location.search}`);

    const jsonResponse = await response.json();

    setSearchedPosts(mapElasticResultToPost(jsonResponse));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (router.query.q) onSearch();
  }, [onSearch, router.query]);

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />

        <SimpleSearch />
        {loading && <Loading />}
        {searchedPosts !== undefined && <Results data={searchedPosts} />}
      </div>
    </>
  );
}
