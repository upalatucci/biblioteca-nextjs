import Head from "next/head";
import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import SimpleSearch from "@components/SimpleSearch";
import Results from "@components/Results";
import useSearch from "@hooks/useSearch";

export default function Ricerca() {
  const {
    data: searchedPosts,
    totalResults,
    isLoading,
    error,
    setIgnoringError,
  } = useSearch("simple_search");

  return (
    <>
      <Head>
        <title>Ricerca | La Biblioteca di Nichiren</title>
      </Head>

      <HomeNavbar />
      <main>
        <SimpleSearch loading={isLoading} />
        {searchedPosts && (
          <h3 className="mx-auto max-w-[1400px] text-4xl md:text-3xl text-primary font-bold mb-8">
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
      <Footer />
    </>
  );
}
