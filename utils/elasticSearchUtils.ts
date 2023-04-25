import {
  AggregationsMultiBucketAggregateBase,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/typesWithBodyKey";

export enum PostType {
  RSND = "rsnd",
  SDL = "sdlpe",
  GLOSSARY = "glossary",
}

export const MAP_BOOK_URL_KEY_TO_POST_TYPE = {
  glossario: PostType.GLOSSARY,
  sdl: PostType.SDL,
  rsnd: PostType.RSND,
} as const;

export const MAP_POST_TYPE_TO_BOOK_URL = {
  [PostType.GLOSSARY]: "glossario",
  [PostType.RSND]: "rsnd",
  [PostType.SDL]: "sdl",
} as const;

export const MAP_BOOK_TO_HUMAN_READABLE = {
  glossario: "Glossario",
  sdl: "Il Sutra del Loto",
  rsnd: "RSND",
} as const;

export const MAP_POST_TYPE_TO_BASE_URL = {
  [PostType.SDL]: "sutra-del-loto",
  [PostType.RSND]: "rsnd",
};

export type ElasticSearchPost = {
  post_id: number;
  ID: number;
  post_author: {
    raw: string;
    login: string;
    display_name: string;
    id: number;
  };
  post_date: string;
  post_date_gmt: string;
  post_title: string;
  post_excerpt: string;
  post_content_filtered: string;
  post_content: string;
  post_status: string;
  post_name: string;
  post_modified: string;
  post_modified_gmt: string;
  post_parent: number;
  post_type: PostType;
  post_mime_type: string;
  permalink: string;
  terms: {
    cat_glossary?: [
      {
        term_id: number;
        slug: string;
        name: string;
        parent: number;
        term_taxonomy_id: number;
        term_order: number;
        facet: string;
      }
    ];
    cat_sdlpe?: [
      {
        term_id: number;
        slug: string;
        name: string;
        parent: number;
        term_taxonomy_id: number;
        term_order: number;
        facet: string;
      }
    ];
    cat_rsnd?: [
      {
        term_id: number;
        slug: string;
        name: string;
        parent: number;
        term_taxonomy_id: number;
        term_order: number;
        facet: string;
      }
    ];
  };
  meta: {
    acf_note: { exact: string; value: string }[];
    acf_cenni_storici: { exact: string; value: string }[];
    acf_destinatario: { value: string }[];
    acf_numero: { value: string }[];
    acf_luogo: { value: string }[];
    acf_data: { value: string }[];
  };
  date_terms: {
    year: number;
    month: number;
    week: number;
    dayofyear: number;
    day: number;
    dayofweek: number;
    dayofweek_iso: number;
    hour: number;
    minute: number;
    second: number;
    m: number;
  };
  comment_count: number;
  comment_status: string;
  ping_status: string;
  menu_order: number;
  guid: string;
  thumbnail: string;
  term_suggest: string[];
};

const removeUnclosedTags = (text: string): string => {
  if (!text) return;

  const div = document.createElement("div");
  div.innerHTML = text;

  return div.innerHTML.replace(/^[^<]*?(&gt;|>)/g, "");
};

export const buildHighlight = (highlight: Record<string, string[]>) => {
  return [
    "post_content",
    "post_content.exact",
    "meta.acf_note.value",
    "meta.acf_note.value.exact",
    "meta.acf_cenni_storici.value",
    "meta.acf_cenni_storici.value.exact",
  ]
    .map((key) =>
      highlight[key]?.map((h) => removeUnclosedTags(h))?.join("...")
    )
    ?.filter((h) => h)
    .join("[...]");
};

export type ElasticSearchPostResult = SearchResponse<
  ElasticSearchPost,
  Record<string, AggregationsMultiBucketAggregateBase>
>;
