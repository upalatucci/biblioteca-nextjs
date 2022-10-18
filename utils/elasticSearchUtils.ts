export enum PostType {
  RSND = "rsnd",
  SDL = "sdlpe",
  GLOSSARY = "glossario",
}

const typeToBaseUrl = (type: PostType) => {
  switch (type) {
    case "sdlpe":
      return "sutra-del-loto";
    case "rsnd":
      return "gosho";
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
  const contentHighlight = highlight?.post_content?.join(["..."]);
  const noteHighlight = highlight?.["meta.acf_note.value"]?.join(["..."]);
  const historyHighlight = highlight?.["meta.acf_cenni_storici.value"]?.join([
    "...",
  ]);

  return [contentHighlight, noteHighlight, historyHighlight]
    .filter((h) => h)
    .join("[...]");
};

export const mapElasticResultToPost = (result: any): PostResultType[] => {
  return result?.hits?.hits?.map(({ _source, highlight }) => ({
    categories: _source.term_suggest || [],
    comment_status: _source.comment_status,
    content: {
      rendered: _source.post_content,
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
    title: { rendered: highlight?.post_title || _source.post_title },
    type: _source.post_type,
    highlight_fields: highlight ? Object.keys(highlight) : [],
    baseURL: typeToBaseUrl(_source.post_type),
  }));
};
