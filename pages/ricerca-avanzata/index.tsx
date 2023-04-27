import Head from "next/head";
import AdvancedSearch from "@components/AdvancedSearch/AdvancedSearch";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Results from "@components/Results";
import useSearch from "@hooks/useSearch";

export default function Ricerca() {
  const {
    data: searchedPosts,
    totalResults,
    isLoading,
    error,
    setIgnoringError,
  } = useSearch("search");

  return (
    <>
      <Head>
        <title>Ricerca Avanzata | La Biblioteca di Nichiren</title>
      </Head>

      <main className="search-page">
        <AdvancedSearch loading={isLoading} />

        {searchedPosts && (
          <h3 className="max-w-[1400px] text-2xl md:text-4xl text-primary font-bold px-8">
            Abbiamo trovato
          </h3>
        )}

        <Results
          data={searchedPosts}
          totalResults={totalResults}
          loading={isLoading}
          error={error}
          onErrorDismiss={() => setIgnoringError(true)}
        />
      </main>
    </>
  );
}
