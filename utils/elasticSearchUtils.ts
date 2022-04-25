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
  type: string;
  highlight_fields: string[];
};

export const mapElasticResultToPost = (result: any): PostResultType[] => {
  return result?.hits?.hits?.map(({ _source, highlight }) => ({
    categories:
      _source.terms?.category?.map((category) => category.term_id) || [],
    comment_status: _source.comment_status,
    content: {
      rendered: highlight?.post_content?.join("[...]") || _source.post_content,
    },
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
    highlight_fields: Object.keys(highlight),
  }));
};
