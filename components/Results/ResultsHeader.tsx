import { MAP_POST_TYPE_TO_BOOK_URL, PostType } from "@utils/elasticSearchUtils";
import React from "react";
import ResultTab from "./ResultTab";
import { useRouter } from "next/router";

type ResultsHeaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
};

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ data }) => {
  const router = useRouter();
  const aggregationData = data?.aggregations?.book?.buckets;

  const rsndCount =
    aggregationData?.find((agg) => agg.key === PostType.RSND)?.doc_count || 0;
  const sdlCount =
    aggregationData?.find((agg) => agg.key === PostType.SDL)?.doc_count || 0;
  const glossaryCount =
    aggregationData?.find((agg) => agg.key === PostType.GLOSSARY)?.doc_count ||
    0;

  const totalCount = rsndCount + sdlCount + glossaryCount;

  if (totalCount === 0) return null;

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center font-sans text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <ResultTab count={totalCount} title="Tutti" active={!router.query.book} />

      <ResultTab
        count={rsndCount}
        title="RSND"
        tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
        active={router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
      />

      <ResultTab
        count={sdlCount}
        title="Il Sutra del Loto"
        tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
        active={router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
      />

      <ResultTab
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
