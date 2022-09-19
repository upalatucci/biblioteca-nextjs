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
    <div className="container mx-auto pt-8 px-14" id="search-results" ref={ref}>
      {data.length === 0 && <h2 className="text-3xl md:text-4xl px-4 font-bold">Spiacenti nessun risultato trovato</h2>}
      {data.length !== 0 && (
        <>
          <h2 className="text-4xl md:text-5xl py-4 font-bold">Abbiamo trovato</h2>
          <hr className="border border-secondary" />
          <div className="divide-y-2 divide-dashed pt-4">
          {data?.map((postResult) => (
            <PostResults key={postResult.id} post={postResult} />
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
