import { PostResultType } from "../utils/elasticSearchUtils";
import PostResults from "./PostResult";

type ResultsProps = {
  data: PostResultType[];
};
const Results: React.FC<ResultsProps> = ({ data }) => (
  <div className="container">
    {data.length === 0 && <h2>Spiacenti nessun risultato trovato</h2>}
    {data.length !== 0 && (
      <>
        <h2>Abbiamo trovato:</h2>
        <hr />
        {data?.map((postResult) => (
          <PostResults key={postResult.id} post={postResult} />
        ))}
      </>
    )}
  </div>
);

export default Results;
