import { useRouter } from "next/router";
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
    return <div id="risultati"></div>;
  }

  return (
    <div id="risultati">
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
