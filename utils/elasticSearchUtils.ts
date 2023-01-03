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
  id: string;
  link: string;
  meta: string;
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
  return div.innerHTML;
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

export const mapElasticResultToPost = (result: any): PostResultType[] => {
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
        highlight?.post_title ||
        highlight?.["post_title.exact"] ||
        _source.post_title,
    },
    type: _source.post_type,
    highlight_fields: highlight ? Object.keys(highlight) : [],
    baseURL: typeToBaseUrl(_source.post_type),
  }));
};
