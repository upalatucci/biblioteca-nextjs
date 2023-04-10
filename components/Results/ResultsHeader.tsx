import {
  ElasticSearchPostResult,
  MAP_POST_TYPE_TO_BOOK_URL,
  PostType,
} from "@utils/elasticSearchUtils";
import React from "react";
import ResultTab from "./ResultTab";
import { useRouter } from "next/router";
import { retainAggregationData, useLoadingTab } from "./utils";

type ResultsHeaderProps = {
  data: ElasticSearchPostResult;
  loading: boolean;
};

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ data, loading }) => {
  const router = useRouter();

  const loadingTab = useLoadingTab(loading);

  const aggregationData = retainAggregationData(
    data?.aggregations?.book?.buckets
  );

  const rsndCount =
    aggregationData?.find((agg) => agg.key === PostType.RSND)?.doc_count || 0;
  const sdlCount =
    aggregationData?.find((agg) => agg.key === PostType.SDL)?.doc_count || 0;
  const glossaryCount =
    aggregationData?.find((agg) => agg.key === PostType.GLOSSARY)?.doc_count ||
    0;

  const totalCount = rsndCount + sdlCount + glossaryCount;

  return (
    <ul className="relative mb-[-1px] max-w-[1400px] flex flex-wrap text-center font-sans dark:text-gray-400 md:pl-8">
      <ResultTab
        loading={loadingTab}
        count={totalCount}
        title="Tutti"
        active={!router.query.book}
      />

      <ResultTab
        loading={loadingTab}
        count={rsndCount}
        title="RSND"
        tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
        active={router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
      />

      <ResultTab
        loading={loadingTab}
        count={sdlCount}
        title="Il Sutra del Loto"
        tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
        active={router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
      />

      <ResultTab
        loading={loadingTab}
        count={glossaryCount}
        title={"Glossario"}
        tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.GLOSSARY]}
        active={
          router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.GLOSSARY]
        }
      />
    </ul>
  );
};

export default ResultsHeader;
