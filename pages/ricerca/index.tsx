import Head from "next/head";
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

      <main>
        <SimpleSearch loading={isLoading} />
        {searchedPosts && (
          <h3 className="max-w-[1400px] mx-auto text-2xl md:text-4xl text-primary font-bold px-8">
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
