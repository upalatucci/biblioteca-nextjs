import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { FIELDS } from "@utils/constants";
import { getQueryParamAsArray } from "@utils/utils";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useHighlightedPost = (originalPost) => {
  const router = useRouter();
  const searchText = router.query.q;
  const fields = getQueryParamAsArray<FIELDS>(router.query.fields || []);

  const { isLoading, error, data } = useQuery({
    queryKey: [
      "highligh-post",
      searchText,
      router.query.fields,
      router.query.searchType,
    ],
    queryFn: () => {
      if (searchText) {
        let queryParams = `q=${searchText}&postId=${originalPost.id}${fields
          .map((field) => `&fields=${field}`)
          .join("")}`;

        if (router.query.searchType) {
          queryParams += `&searchType=${router.query.searchType}`;
        }

        return fetch(`/api/highlight?${queryParams}`)
          .then((res) => res.json())
          .then(
            (elasticResult: SearchResponse) =>
              elasticResult?.hits?.hits?.[0]?.highlight
          );
      }
    },
  });

  return [
    {
      ...(originalPost || {}),
      title: {
        rendered:
          data?.post_title?.[0] ||
          data?.["post_title.exact"]?.[0] ||
          originalPost?.title?.rendered,
      },
      content: {
        rendered:
          data?.post_content?.[0] ||
          data?.["post_content.exact"]?.[0] ||
          originalPost?.content?.rendered,
      },
      acf: {
        acf_cenni_storici:
          data?.["meta.acf_cenni_storici.value"]?.[0] ||
          data?.["meta.acf_cenni_storici.value.exact"]?.[0] ||
          originalPost?.acf?.acf_cenni_storici,
        acf_note:
          data?.["meta.acf_note.value"]?.[0] ||
          data?.["meta.acf_note.value.exact"]?.[0] ||
          originalPost?.acf?.acf_note,
      },
    },
    isLoading,
    error,
  ];
};

export default useHighlightedPost;
