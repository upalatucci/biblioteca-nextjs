import {
  mapElasticResultToPost,
  MAP_POST_TYPE_TO_BOOK_URL,
  PostType,
} from "@utils/elasticSearchUtils";
import classNames from "classnames";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import PostResult from "./PostResult";
import ResultsLoading from "./ResultsLoading";
import ResultTab from "./ResultTab";

type ResultsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  totalResults: number;
  loading: boolean;
};

const Results: React.FC<ResultsProps> = ({ data, totalResults, loading }) => {
  const aggregationData = data?.aggregations?.book?.buckets;
  const searchedPosts = useMemo(() => mapElasticResultToPost(data), [data]);
  const router = useRouter();

  const rsndCount =
    aggregationData?.find((agg) => agg.key === PostType.RSND)?.doc_count || 0;
  const sdlCount =
    aggregationData?.find((agg) => agg.key === PostType.SDL)?.doc_count || 0;
  const glossaryCount =
    aggregationData?.find((agg) => agg.key === PostType.GLOSSARY)?.doc_count ||
    0;

  const totalCount = rsndCount + sdlCount + glossaryCount;

  if (loading) {
    return (
      <div
        className="container mx-auto px-4 pt-8 xl:px-10 min-h-[50vh]"
        id="risultati"
      >
        <ResultsLoading />
      </div>
    );
  }

  if (!data || !searchedPosts) {
    return (
      <div className="container mx-auto px-4 xl:px-10" id="risultati"></div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 pt-8 xl:px-10 min-h-[50vh]"
      id="risultati"
    >
      {totalCount === 0 && (
        <h2 className="text-3xl md:text-4xl px-4 font-bold">
          Spiacenti nessun risultato trovato
        </h2>
      )}
      {totalCount !== 0 && (
        <>
          <h2 className="text-4xl md:text-5xl py-4 font-bold">
            Abbiamo trovato
          </h2>
          <hr className="border border-secondary" />

          <ul className="flex flex-wrap text-sm font-medium text-center font-sans text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <ResultTab
              count={totalCount}
              title="Tutti"
              active={!router.query.book}
            />

            <ResultTab
              count={rsndCount}
              title="RSND"
              tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
              active={
                router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]
              }
            />

            <ResultTab
              count={sdlCount}
              title="Il Sutra del Loto"
              tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
              active={
                router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]
              }
            />

            <ResultTab
              count={glossaryCount}
              title="Glossario"
              tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.GLOSSARY]}
              active={
                router.query.book ===
                MAP_POST_TYPE_TO_BOOK_URL[PostType.GLOSSARY]
              }
            />
          </ul>

          <ul className="divide-y-2 divide-dashed pt-4 mb-10">
            {searchedPosts.map((postResult) => (
              <PostResult key={postResult.id} post={postResult} />
            ))}
          </ul>
          <Pagination totalResults={totalResults} anchorHash="risultati" />
        </>
      )}
    </div>
  );
};

export default Results;
