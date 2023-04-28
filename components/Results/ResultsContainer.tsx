import {
  ElasticSearchPostResult,
  MAP_BOOK_TO_HUMAN_READABLE,
} from "@utils/elasticSearchUtils";
import React from "react";
import PostResult from "./PostResult";
import Pagination from "@components/Pagination";
import { NextRouter, useRouter } from "next/router";
import ResultsLoading from "./ResultsLoading";
import Link from "next/link";
import TabFilters from "./TabFilters";
import { Url } from "url";

const NoResults = () => (
  <div className="border-b border-gray-400 bg-white px-8 shadow-md rounded-3xl">
    <div className="md:px-20 xl:px-0 mx-auto max-w-[1400px] py-20">
      <h3 className="text-lg md:text-4xl px-4 font-bold">
        Spiacenti nessun risultato trovato
      </h3>
    </div>
  </div>
);

const getBaseSearchPath = (router: NextRouter): Partial<Url> => {
  return {
    pathname: router.pathname.replace("/[book]", ""),
    query: {
      q: router?.query?.q,
      fields: router?.query?.fields,
      searchType: router?.query?.searchType,
    },
    hash: "risultati",
  };
};

const NoResultsForThatBook = ({ router }) => (
  <div className="mx-auto border-b border-gray-400 bg-white shadow-md rounded-3xl">
    <div className="md:px-20 xl:px-0 mx-auto max-w-[1400px] py-20">
      <div className="my-4">
        <h3 className="text-lg px-4 font-bold">
          Spiacenti nessun risultato per questa fonte:{" "}
          {MAP_BOOK_TO_HUMAN_READABLE[router?.query?.book as string] ||
            router?.query?.book}
        </h3>
        <Link href={getBaseSearchPath(router)} className="text-primary px-4">
          Prova a cercare su tutte le fonti
        </Link>
      </div>
    </div>
  </div>
);

type ResultsContainerProps = {
  data: ElasticSearchPostResult;
  loading: boolean;
  totalResults: number;
};

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  data,
  loading,
  totalResults,
}) => {
  const router = useRouter();

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
    <div className="mx-auto border-b border-gray-400 bg-white shadow-md rounded-3xl">
      <div className="px-8 mx-auto max-w-[1400px] py-8 md:py-14">
        <TabFilters />
        <ul className="divide-y-2 divide-dashed mb-10 mx-auto bg-defaultBg rounded-3xl shadow-md px-4 md:px-10 py-4">
          {data?.hits?.hits?.map((searchHit) => (
            <PostResult
              key={searchHit._id}
              post={searchHit._source}
              highlights={searchHit.highlight}
            />
          ))}
          <Pagination totalResults={totalResults} anchorHash="risultati" />
        </ul>
      </div>
    </div>
  );
};

export default ResultsContainer;
