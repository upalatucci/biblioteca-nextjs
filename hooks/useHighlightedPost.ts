import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { FIELDS } from "@utils/constants";
import { ElasticSearchPostResult } from "@utils/elasticSearchUtils";
import { getQueryParamAsArray } from "@utils/utils";
import { GetStaticPost } from "lib/db";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useHighlightedPost = (
  originalPost: GetStaticPost
): [post: GetStaticPost, loading: boolean, error: Error | undefined] => {
  const router = useRouter();
  const searchText = router.query.q;
  const fields = getQueryParamAsArray<FIELDS>(router.query.fields || []);

  const { isLoading, error, data } = useQuery<
    ElasticSearchPostResult["hits"]["hits"][0]["highlight"],
    Error
  >({
    queryKey: [
      "highligh-post",
      searchText,
      router.query.fields,
      router.query.searchType,
    ],
    queryFn: () => {
      if (!searchText) return;

      const urlParams = new URLSearchParams();

      urlParams.set("q", searchText as string);
      urlParams.set("postId", originalPost.id.toString());

      fields.forEach((field) => urlParams.append("fields", field));

      if (router.query.searchType) {
        urlParams.set("searchType", router.query.searchType as string);
      }

      return fetch(`/api/highlight?${urlParams.toString()}`)
        .then((res) => res.json())
        .then(
          (elasticResult: SearchResponse) =>
            elasticResult?.hits?.hits?.[0]?.highlight
        );
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (router.isReady && data && !isLoading && router.query.q)
      setTimeout(() => document.querySelector("mark")?.scrollIntoView(), 500);
  }, [data]);

  if (!originalPost) return [undefined, isLoading, error];

  return [
    {
      ...originalPost,
      post_title:
        data?.post_title?.[0] ||
        data?.["post_title.exact"]?.[0] ||
        originalPost?.post_title,
      post_content:
        data?.post_content_filtered?.[0] ||
        data?.["post_content_filtered.exact"]?.[0] ||
        originalPost?.post_content,
      acf: {
        ...originalPost?.acf,
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
