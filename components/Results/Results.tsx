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
import Select from "@components/Select";
import {
  DATES,
  PLACES_OPTIONS,
  RECIPIENTS_OPTIONS,
} from "@components/AdvancedSearch/constants";

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
    </div>
  );
};

export default Results;
