import { MAP_POST_TYPE_TO_BOOK_URL, PostType } from "@utils/elasticSearchUtils";
import React from "react";
import ResultTab from "./ResultTab";
import { useRouter } from "next/router";
import {
  mapElasticResultToPost,
  MAP_BOOK_TO_HUMAN_READABLE,
} from "@utils/elasticSearchUtils";
import { useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import PostResult from "./PostResult";
import ResultsLoading from "./ResultsLoading";
import Link from "next/link";
import Select from "@components/Select";
import {
  DATES,
  PLACES_OPTIONS,
  RECIPIENTS_OPTIONS,
} from "@components/AdvancedSearch/constants";

type ResultsHeaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
};

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ data }) => {
  const router = useRouter();
  const { from, to, recipient, place } = router.query;
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
    <>
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

      {router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND] && (
        <>
          <h3 className="text-lg font-serif md:text-xl text-primary font-bold mt-4 mb-6">
            Filtra i risultati:
          </h3>

          <div className="flex items-center justify-between flex-wrap">
            <span className="mb-4 mr-4">
              <label className="flex items-center">
                <span className="mr-4">Destinatario</span>
                <Select
                  onChange={(newRecipient) =>
                    router.push({
                      ...router,
                      query: { ...router.query, recipient: newRecipient },
                    })
                  }
                  value={(recipient as string) || RECIPIENTS_OPTIONS[0].value}
                  name="destinatario"
                  options={RECIPIENTS_OPTIONS}
                  className="w-64"
                />
              </label>
            </span>

            <span className="mb-4">
              <label className="flex items-center">
                <span className="mr-4">Scritto a</span>
                <Select
                  onChange={(newPlace) =>
                    router.push({
                      ...router,
                      query: { ...router.query, place: newPlace },
                    })
                  }
                  value={(place as string) || PLACES_OPTIONS[0].value}
                  name="luogo"
                  options={PLACES_OPTIONS}
                  className="w-64"
                />
              </label>
            </span>

            <span className="mb-4">
              <label className="flex items-center">
                <span className="mr-4">Scritto nel</span>
                <Select
                  onChange={(newFrom) =>
                    router.push({
                      ...router,
                      query: { ...router.query, from: newFrom },
                    })
                  }
                  value={from as string}
                  name="da"
                  options={DATES}
                  className="mr-4 w-16"
                />
                -
                <Select
                  onChange={(newTo) =>
                    router.push({
                      ...router,
                      query: { ...router.query, to: newTo },
                    })
                  }
                  value={to as string}
                  name="a"
                  options={DATES}
                  className="ml-4 w-16"
                />
              </label>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default ResultsHeader;
