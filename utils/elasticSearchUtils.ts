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
};

export const MAP_POST_TYPE_TO_BOOK_URL = {
  [PostType.GLOSSARY]: "glossario",
  [PostType.RSND]: "rsnd",
  [PostType.SDL]: "sdl",
};

export const MAP_BOOK_TO_HUMAN_READABLE = {
  glossario: "Glossario",
  sdl: "Il Sutra del Loto",
  rsnd: "RSND",
};

const typeToBaseUrl = (type: PostType) => {
  switch (type) {
    case "sdlpe":
      return "sutra-del-loto";
    case "rsnd":
      return "rsnd";
    default:
      undefined;
  }
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
    cat_glossary: [
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
  meta: string[];
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

export type PostResultType = {
  categories: string[];
  comment_status: string;
  content: {
    rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: { rendered: string };
  featured_media: 0;
  format: "standard";
  guid: { rendered: string };
  id: number;
  link: string;
  meta: string[];
  modified: string;
  ping_status: string;
  slug: string;
  title: { rendered: string };
  type: PostType;
  highlight_fields: string[];
  highlight: string;
  baseURL: string;
};

const removeUnclosedTags = (text: string): string => {
  if (!text) return;

  const div = document.createElement("div");
  div.innerHTML = text;

  return div.innerHTML.replace(/^[^<]*?(&gt;|>)/g, "");
};

const buildHighlight = (highlight) => {
  const contentHighlight = highlight?.post_content_filtered
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);
  const contentExactHighlight = highlight?.["post_content_filtered.exact"]
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);
  const noteHighlight = highlight?.["meta.acf_note.value"]
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);
  const noteExactHighlight = highlight?.["meta.acf_note.value.exact"]
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);
  const historyHighlight = highlight?.["meta.acf_cenni_storici.value"]
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);
  const historyExactHighlight = highlight?.[
    "meta.acf_cenni_storici.value.exact"
  ]
    ?.map((h) => removeUnclosedTags(h))
    ?.join(["..."]);

  return [
    contentHighlight,
    contentExactHighlight,
    noteHighlight,
    noteExactHighlight,
    historyHighlight,
    historyExactHighlight,
  ]
    .filter((h) => h)
    .join("[...]");
};

export type ElasticSearchPostResult = SearchResponse<
  ElasticSearchPost,
  Record<string, AggregationsMultiBucketAggregateBase>
>;

export const mapElasticResultToPost = (
  result: ElasticSearchPostResult
): PostResultType[] => {
  return result?.hits?.hits?.map(({ _source, highlight }) => ({
    categories: _source.term_suggest || [],
    comment_status: _source.comment_status,
    content: {
      rendered: _source.post_content_filtered,
    },
    highlight: removeUnclosedTags(buildHighlight(highlight)),
    date: _source.post_date,
    date_gmt: _source.post_date_gmt,
    excerpt: { rendered: _source.post_excerpt },
    featured_media: 0,
    format: "standard",
    guid: { rendered: _source.guid },
    id: _source.ID,
    link: _source.permalink,
    meta: _source.meta,
    modified: _source.post_modified,
    ping_status: "open",
    slug: _source.post_name,
    title: {
      rendered:
        highlight?.post_title?.[0] ||
        highlight?.["post_title.exact"]?.[0] ||
        _source.post_title,
    },
    type: _source.post_type,
    highlight_fields: highlight ? Object.keys(highlight) : [],
    baseURL: typeToBaseUrl(_source.post_type),
  }));
};
