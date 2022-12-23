import { MAP_POST_TYPE_TO_BOOK_URL, PostType } from "@utils/elasticSearchUtils";
import React from "react";
import ResultTab from "./ResultTab";
import { useRouter } from "next/router";
import Select from "@components/Select";
import { DATES } from "@components/AdvancedSearch/constants";
import { RECIPIENTS_OPTIONS } from "@components/AdvancedSearch/recipients";
import { PLACES_OPTIONS } from "@components/AdvancedSearch/places";

type ResultsHeaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
};

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ data, loading }) => {
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

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center font-sans text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <ResultTab
          loading={loading}
          count={totalCount}
          title="Tutti"
          active={!router.query.book}
        />

        <ResultTab
          loading={loading}
          count={rsndCount}
          title="RSND"
          tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]}
          active={
            router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.RSND]
          }
        />

        <ResultTab
          loading={loading}
          count={sdlCount}
          title="Il Sutra del Loto"
          tabKey={MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
          active={router.query.book === MAP_POST_TYPE_TO_BOOK_URL[PostType.SDL]}
        />

        <ResultTab
          loading={loading}
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
                      query: {
                        ...router.query,
                        recipient: newRecipient,
                      },
                      hash: "risultati",
                    })
                  }
                  value={(recipient as string) || RECIPIENTS_OPTIONS[0]}
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
                      query: {
                        ...router.query,
                        place: newPlace,
                      },
                      hash: "risultati",
                    })
                  }
                  value={(place as string) || PLACES_OPTIONS[0]}
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
                      hash: "risultati",
                    })
                  }
                  value={(from as string) || DATES[0]}
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
                      hash: "risultati",
                    })
                  }
                  value={(to as string) || DATES.at(-1)}
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
