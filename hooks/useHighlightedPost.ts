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
    queryKey: ["highligh-post", searchText],
    queryFn: () => {
      if (searchText)
        return fetch(
          `/api/highlight?q=${searchText}&postId=${originalPost.id}${fields
            .map((field) => `&fields=${field}`)
            .join("")}`
        )
          .then((res) => res.json())
          .then(
            (elasticResult: SearchResponse) =>
              elasticResult?.hits?.hits?.[0]?.highlight
          );
    },
  });

  return [
    {
      ...(originalPost || {}),
      title: {
        rendered: data?.post_title?.[0] || originalPost?.title?.rendered,
      },
      content: {
        rendered: data?.post_content?.[0] || originalPost?.content?.rendered,
      },
      acf: {
        acf_cenni_storici:
          data?.["meta.acf_cenni_storici.value"]?.[0] ||
          originalPost?.acf?.acf_cenni_storici,
        acf_note:
          data?.["meta.acf_note.value"]?.[0] || originalPost?.acf?.acf_note,
      },
    },
    isLoading,
    error,
  ];
};

export default useHighlightedPost;
