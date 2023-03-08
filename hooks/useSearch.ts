import {
  AggregationsAggregate,
  SearchResponseBody,
  SearchTotalHits,
} from "@elastic/elasticsearch/lib/api/types";
import {
  MAP_BOOK_URL_KEY_TO_POST_TYPE,
  PostResultType,
} from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useSearch = (searchURL = "simple_search") => {
  const router = useRouter();

  const [ignoringError, setIgnoringError] = useState(false);

  const { data, isLoading, error } = useQuery<
    SearchResponseBody<PostResultType, Record<string, AggregationsAggregate>>,
    Error
  >({
    queryKey: [searchURL, router.query],
    queryFn: async () => {
      if (router.query.q) {
        let searchQuery = location.search;

        if (router.query.book)
          searchQuery += `&sources=${
            MAP_BOOK_URL_KEY_TO_POST_TYPE[router.query.book as string]
          }`;

        const response = await fetch(`/api/${searchURL}${searchQuery}`);

        if (!response.ok)
          return Promise.reject(
            new Error(
              "Si e' verificato un errore improvviso. Per favore, riprovare piu tardi."
            )
          );
        return response.json();
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => setIgnoringError(false), [error]);

  const totalResults = (data?.hits?.total as SearchTotalHits)?.value;

  return {
    data,
    totalResults,
    isLoading,
    error: ignoringError ? null : error,
    setIgnoringError,
  };
};

export default useSearch;
