import {
  mapElasticResultToPost,
  MAP_BOOK_TO_HUMAN_READABLE,
} from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import PostResult from "./PostResult";
import ResultsLoading from "./ResultsLoading";
import Link from "next/link";
import ResultsHeader from "./ResultsHeader";
import ResultsContainer from "./ResultsContainer";

type ResultsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  totalResults: number;
  loading: boolean;
};

const Results: React.FC<ResultsProps> = ({ data, totalResults, loading }) => {
  const router = useRouter();

  if (!router.query.q) {
    return (
      <div className="container mx-auto px-4 xl:px-10" id="risultati"></div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 pt-8 xl:px-10 min-h-[50vh]"
      id="risultati"
    >
      <ResultsHeader data={data} loading={loading} />

      <ResultsContainer
        data={data}
        totalResults={totalResults}
        loading={loading}
      />

      {/* <h2 className="text-4xl md:text-5xl py-4 font-bold">
            Abbiamo trovato
          </h2>
          <hr className="border border-secondary" /> */}

      {/* <h3 className="text-lg font-serif md:text-xl text-primary font-bold mt-4 mb-6">
                Filtra i risultati:
              </h3>

              <div className="flex items-center justify-between flex-wrap">
                <span className="mb-4 mr-4">
                  <label className="flex items-center">
                    <span className="mr-4">Destinatario</span>
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_RECIPIENT)}
                      value={recipient || RECIPIENTS_OPTIONS[0].value}
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
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_PLACE)}
                      value={place || PLACES_OPTIONS[0].value}
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
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_FROM)}
                      value={from}
                      name="da"
                      options={DATES}
                      className="mr-4 w-16"
                    />
                    -
                    <Select
                      onChange={onChangeSelect(ACTION_TYPES.CHANGE_TO)}
                      value={to}
                      name="a"
                      options={DATES}
                      className="ml-4 w-16"
                    />
                  </label>
                </span>
              </div> */}
    </div>
  );
};

export default Results;
