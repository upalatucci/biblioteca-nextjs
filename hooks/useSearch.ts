import { MAP_BOOK_URL_KEY_TO_POST_TYPE } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useSearch = (searchURL = "simple_search") => {
  const router = useRouter();

  const [ignoringError, setIgnoringError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: [searchURL, router.query],
    queryFn: () => {
      if (router.query.q) {
        let searchQuery = location.search;

        if (router.query.book)
          searchQuery += `&sources=${
            MAP_BOOK_URL_KEY_TO_POST_TYPE[router.query.book as string]
          }`;
        return fetch(`/api/${searchURL}${searchQuery}`).then((res) =>
          res.json()
        );
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => setIgnoringError(false), [error]);

  const totalResults = data?.hits?.total?.value;

  return [
    data,
    totalResults,
    isLoading,
    ignoringError ? null : error,
    setIgnoringError,
  ];
};

export default useSearch;
