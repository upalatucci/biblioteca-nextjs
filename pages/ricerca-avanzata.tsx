import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
import Loading from "../components/Loading";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import Results from "../components/Results";
import qs from "querystring";
import {
  mapElasticResultToPost,
  PostResultType,
} from "../utils/elasticSearchUtils";

export default function Ricerca() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();

  const onSearch = useCallback(async () => {
    setSearchedPosts(undefined);
    setLoading(true);

    const response = await fetch(`/api/search${location.search}`);

    const jsonResponse = await response.json();

    setSearchedPosts(mapElasticResultToPost(jsonResponse));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (router.query.q && router.query.sources && router.query.fields) {
      onSearch();
    }
  }, [onSearch, router.query.fields, router.query.q, router.query.sources]);

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />

        <AdvancedSearch />
        {loading && <Loading />}
        {searchedPosts !== undefined && <Results data={searchedPosts} />}
      </div>
    </>
  );
}
