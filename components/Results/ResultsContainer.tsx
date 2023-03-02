import {
  MAP_BOOK_TO_HUMAN_READABLE,
  mapElasticResultToPost,
} from "@utils/elasticSearchUtils";
import React, { useMemo } from "react";
import PostResult from "./PostResult";
import Pagination from "@components/Pagination";
import { useRouter } from "next/router";
import ResultsLoading from "./ResultsLoading";
import Link from "next/link";
import { removeBook, removeRSNDParams } from "./utils";
import TabFilters from "./TabFilters";

const NoResults = () => (
  <div className="bg-white shadow-md rounded-3xl">
    <div className="px-8 md:px-20 xl:px-0 md:max-w-6xl mx-auto py-20">
      <h2 className="text-3xl md:text-4xl px-4 font-bold">
        Spiacenti nessun risultato trovato
      </h2>
    </div>
  </div>
);

const removeParams = (routerPath: string, book: string) => {
  return removeRSNDParams(removeBook(routerPath, book));
};

const NoResultsForThatBook = ({ router }) => (
  <div className="bg-white shadow-md rounded-3xl">
    <div className="px-8 md:px-20 xl:px-0 md:max-w-6xl mx-auto py-20">
      <div className="my-4">
        <h3 className="text-lg px-4 font-bold">
          Spiacenti nessun risultato per questa fonte:{" "}
          {MAP_BOOK_TO_HUMAN_READABLE[router?.query?.book as string] ||
            router?.query?.book}
        </h3>
        <Link href={removeParams(router.asPath, router?.query?.book as string)}>
          <a className=" px-4">Prova a cercare su tutte le fonti</a>
        </Link>
      </div>
    </div>
  </div>
);

type ResultsContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
  totalResults: number;
};

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  data,
  loading,
  totalResults,
}) => {
  const router = useRouter();
  const searchedPosts = useMemo(() => mapElasticResultToPost(data), [data]);

  if (!loading && totalResults === 0 && !router?.query?.book) {
    return <NoResults />;
  }

  if (!loading && totalResults === 0 && router?.query?.book) {
    return <NoResultsForThatBook router={router} />;
  }

  if (loading) {
    return <ResultsLoading />;
  }

  return (
    <div className="bg-white shadow-md rounded-3xl">
      <div className="px-8 md:px-20 xl:px-0 md:max-w-6xl mx-auto pt-20">
        <TabFilters />
        <ul className="divide-y-2 divide-dashed mb-10 mx-auto bg-defaultBg  rounded-xl shadow-md  px-4 md:px-10 py-8">
          {searchedPosts?.map((postResult) => (
            <PostResult key={postResult.id} post={postResult} />
          ))}
        </ul>
        <Pagination totalResults={totalResults} anchorHash="risultati" />
      </div>
    </div>
  );
};

export default ResultsContainer;
