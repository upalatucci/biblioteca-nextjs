import { useEffect, useRef } from "react";
import { PostResultType } from "../utils/elasticSearchUtils";
import Pagination from "./Pagination";
import PostResults from "./PostResult";

type ResultsProps = {
  data: PostResultType[];
  totalResults: number;
};
const Results: React.FC<ResultsProps> = ({ data, totalResults }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current && data.length > 0)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
  }, [ref]);

  return (
    <div
      className="container mx-auto px-4 pt-8 xl:px-14 min-h-[50vh]"
      id="search-results"
      ref={ref}
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
            <Pagination
              totalResults={totalResults}
              anchorHash="search-results"
              array={data}
              arrayStatic={false}
              renderer={(postResult) => (
                <PostResults key={postResult.id} post={postResult} />
              )}
            />
          </ul>
        </>
      )}
    </div>
  );
};

export default Results;
