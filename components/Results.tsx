import { useEffect, useRef } from "react";
import { PostResultType } from "../utils/elasticSearchUtils";
import PostResults from "./PostResult";

type ResultsProps = {
  data: PostResultType[];
};
const Results: React.FC<ResultsProps> = ({ data }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current)
      (ref.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
  }, [ref]);

  return (
    <div className="results container" id="search-results" ref={ref}>
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
};

export default Results;
