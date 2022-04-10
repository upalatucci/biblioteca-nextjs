import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import Results from "../components/Results";
import Search from "../components/Search";
import {
  mapElasticResultToPost,
  PostResultType,
} from "../utils/elasticSearchUtils";

export default function Ricerca() {
  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState<PostResultType[]>();
  const router = useRouter();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      router.query.q = searchText;
      router.push(router);
    },
    [router, searchText]
  );

  const onSearchPost = async (searchText) => {
    const response = await fetch(`/api/search?q=${searchText}`);

    const jsonResponse = await response.json();

    setSearchedPosts(mapElasticResultToPost(jsonResponse));
  };

  useEffect(() => {
    onSearchPost(router.query.q);
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
        {searchedPosts !== undefined && <Results data={searchedPosts} />}
      </div>
    </>
  );
}
