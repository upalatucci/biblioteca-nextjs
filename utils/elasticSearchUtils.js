export const mapElasticResultToPost = (result) => {
  return result?.hits?.hits?.map(({ _source }) => ({
    categories:
      _source.terms?.category?.map((category) => category.term_id) || [],
    comment_status: _source.comment_status,
    content: { rendered: _source.post_content },
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
    title: { rendered: _source.post_title },
    type: _source.post_type,
  }));
};
