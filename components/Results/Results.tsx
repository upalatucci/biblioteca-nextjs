import { useRouter } from "next/router";
import ResultsHeader from "./ResultsHeader";
import ResultsContainer from "./ResultsContainer";
import { ElasticSearchPostResult } from "@utils/elasticSearchUtils";

type ResultsProps = {
  data: ElasticSearchPostResult;
  totalResults: number;
  loading: boolean;
  error?: Error;
  onErrorDismiss: () => void;
};

const Results: React.FC<ResultsProps> = ({
  data,
  totalResults,
  loading,
  error,
  onErrorDismiss,
}) => {
  const router = useRouter();

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative container mx-auto my-4 mb-20"
        role="alert"
      >
        <div>
          <strong className="font-bold">Errore</strong>
        </div>
        <span className="block sm:inline">{error?.message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            onClick={onErrorDismiss}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    );
  }

  if (!router.query.q) {
    return <div className="py-14 px-8" id="risultati"></div>;
  }

  return (
    <div className="py-14" id="risultati">
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
