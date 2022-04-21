import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import Results from "../components/Results";
import Search from "../components/Search";
import {
  mapElasticResultToPost,
  PostResultType,
} from "../utils/elasticSearchUtils";

export default function Ricerca() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!searchText) return;

      router.query.q = searchText;
      router.push(router);
    },
    [router, searchText]
  );

  const onSearchPost = async (searchText) => {
    setSearchedPosts();
    setLoading(true);
    const response = await fetch(`/api/search?q=${searchText}`);

    const jsonResponse = await response.json();

    setSearchedPosts(mapElasticResultToPost(jsonResponse));
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.q) {
      setSearchText(router.query.q as string);
      onSearchPost(router.query.q);
    }
  }, [router.query.q]);

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <form onSubmit={onSubmit}>
          <section className="container blank-section">
            <div className="inner">
              <h2>Fai la tua ricerca:</h2>
              <Search
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="action-buttons">
                <button className="primary" type="submit">
                  Cerca
                </button>

                <button className="secondary">Reset</button>
              </div>
            </div>
          </section>
        </form>
        {loading && <Loading />}
        {searchedPosts !== undefined && <Results data={searchedPosts} />}
      </div>
    </>
  );
}
