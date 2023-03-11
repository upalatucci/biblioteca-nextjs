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
  <div className="border-b border-gray-400 bg-white px-8 shadow-md rounded-3xl">
    <div className="md:px-20 xl:px-0 mx-auto max-w-[1400px] py-20">
      <h3 className="text-3xl md:text-4xl px-4 font-bold">
        Spiacenti nessun risultato trovato
      </h3>
    </div>
  </div>
);

const removeParams = (routerPath: string, book: string) => {
  return removeRSNDParams(removeBook(routerPath, book));
};

const NoResultsForThatBook = ({ router }) => (
  <div className="border-b border-gray-400 bg-white px-8 shadow-md rounded-3xl">
    <div className="md:px-20 xl:px-0 mx-auto max-w-[1400px] py-20">
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
    <div className="border-b border-gray-400 bg-white px-8 shadow-md rounded-3xl">
      <div className="md:px-20 xl:px-0 mx-auto max-w-[1400px] py-20">
        <TabFilters />
        <ul className="divide-y-2 divide-dashed mb-10 mx-auto bg-defaultBg  rounded-3xl shadow-md  px-4 md:px-10 py-8">
          {searchedPosts?.map((postResult) => (
            <PostResult key={postResult.id} post={postResult} />
          ))}
          <Pagination totalResults={totalResults} anchorHash="risultati" />
        </ul>
      </div>
    </div>
  );
};

export default ResultsContainer;
