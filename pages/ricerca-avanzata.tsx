import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdvancedSearch from "@components/AdvancedSearch/AdvancedSearch";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Results from "@components/Results";
import useSearch from "@hooks/useSearch";

export default function Ricerca() {
  const [searchedPosts, totalResults, isLoading, error, setIgnoringError] =
    useSearch("search");

  return (
    <>
      <Head>
        <title>Ricerca Avanzata | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main className="search-page">
        <AdvancedSearch loading={isLoading} />

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
                onClick={() => setIgnoringError(true)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}

        <Results
          data={searchedPosts}
          totalResults={totalResults}
          loading={isLoading}
        />
      </main>
      <Footer />
    </>
  );
}
