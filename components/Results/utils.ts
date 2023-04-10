/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostResultType, PostType } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useRef } from "react";

const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// don't load tabs when user change tabs
export const useLoadingTab = (loading: boolean): boolean => {
  const router = useRouter();
  const prevRouterQuery = usePrevious<ParsedUrlQuery>(router.query);
  const loadingTab = useRef(true);

  useEffect(() => {
    if (prevRouterQuery?.book !== router?.query?.book) {
      loadingTab.current = false;
    } else {
      loadingTab.current = true;
    }
  }, [router.query]);

  return loadingTab.current ? loading : false;
};

// on changing tabs, retain data to avoid loading
export const retainAggregationData = (data: any): any => {
  const prevData = useRef();

  if (!data) {
    return prevData.current;
  }

  prevData.current = data;

  return data;
};

export const humanizedField = {
  post_content_filtered: "CONTENUTO",
  "post_content_filtered.exact": "CONTENUTO",
  "meta.acf_cenni_storici.value": "CENNI STORICI",
  "meta.acf_cenni_storici.value.exact": "CENNI STORICI",
  "meta.acf_note.value": "NOTE",
  "meta.acf_note.value.exact": "NOTE",
};

export const humanizeTypeCategory = (type: PostType, categories: string[]) => {
  if (type === "glossary") return "Glossario";

  if (type === "rsnd") {
    if (categories.length > 1)
      return `Raccolta degli scritti di Nichiren Daishonin Volume I/II`;
    return `Raccolta degli scritti di Nichiren Daishonin ${categories?.[0]}`;
  }

  return categories?.[0];
};

export const linkField = {
  post_content: "contenuto",
  "post_content.exact": "contenuto",
  post_content_filtered: "contenuto",
  "post_content_filtered.exact": "contenuto",
  "meta.acf_cenni_storici.value": "cenni_storici",
  "meta.acf_cenni_storici.value.exact": "cenni_storici",
  "meta.acf_note.value": "note",
  "meta.acf_note.value.exact": "note",
};

export const getPostResultLink = (
  post: PostResultType,
  queryParams: ParsedUrlQuery,
  goToField?: string
) => {
  const { fields, q, searchType } = queryParams;

  const query: ParsedUrlQuery = {
    slug: post.slug,
    q,
  };

  if (searchType) {
    query.searchType = searchType;
  }

  if (fields) {
    query.fields = fields;
  }

  return {
    pathname: `/${post.baseURL}/[slug]`,
    query,
    hash: goToField ? `#${linkField[goToField]}` : null,
  };
};
