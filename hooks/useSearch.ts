import { mapElasticResultToPost } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const useSearch = (searchURL = "simple_search") => {
  const router = useRouter();

  const [ignoringError, setIgnoringError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["advanced-search", router.query],
    queryFn: () => {
      if (router.query.q && router.query.sources)
        return fetch(`/api/${searchURL}${location.search}`).then((res) =>
          res.json()
        );
    },
  });

  useEffect(() => setIgnoringError(false), [error]);

  const totalResults = data?.hits?.total?.value;
  const searchedPosts = useMemo(() => mapElasticResultToPost(data), [data]);

  return [
    searchedPosts,
    totalResults,
    isLoading,
    ignoringError ? null : error,
    setIgnoringError,
  ];
};

export default useSearch;
