import { PostResultType } from "@utils/elasticSearchUtils";
import Pagination from "../Pagination/Pagination";
import PostResult from "./PostResult";
import ResultsLoading from "./ResultsLoading";

type ResultsProps = {
  data: PostResultType[];
  totalResults: number;
  loading: boolean;
};
const Results: React.FC<ResultsProps> = ({ data, totalResults, loading }) => {
  if (loading) {
    return (
      <div
        className="container mx-auto px-4 pt-8 xl:px-14 min-h-[50vh]"
        id="risultati"
      >
        <ResultsLoading />
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="container mx-auto px-4 pt-8 xl:px-14"
        id="risultati"
      ></div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 pt-8 xl:px-14 min-h-[50vh]"
      id="risultati"
    >
      {data.length === 0 && (
        <h2 className="text-3xl md:text-4xl px-4 font-bold">
          Spiacenti nessun risultato trovato
        </h2>
      )}
      {data.length !== 0 && (
        <>
          <h2 className="text-4xl md:text-5xl py-4 font-bold">
            Abbiamo trovato
          </h2>
          <hr className="border border-secondary" />
          <ul className="divide-y-2 divide-dashed pt-4 mb-10">
            {data.map((postResult) => (
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