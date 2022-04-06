import Head from "next/head";
import { useState } from "react";
import HomeNavbar from "../components/Navbar/HomeNavbar";

import Search from "../components/Search";

export default function Ricerca() {
  const [searchText, setSearchText] = useState("");

  // const jsxPosts = posts.map((post) => {
  //   return <PostResults post={post} key={post.id} />;
  // });

  // const onSearchPost = async (searchText) => {
  //   const response = await fetch(`/api/search?q=${searchText}`);

  //   const jsonResponse = await response.json();

  //   setSearchedPosts(
  //     mapElasticResultToPost(jsonResponse)?.map((post) => (
  //       <PostResults post={post} key={post.id} />
  //     ))
  //   );
  // };

  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <form>
          <section className="container blank-section">
            <div className="inner">
              <h2>Fai la tua ricerca:</h2>
              <Search
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="action-buttons">
                <button className="primary">Cerca</button>

                <button className="secondary">Reset</button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
