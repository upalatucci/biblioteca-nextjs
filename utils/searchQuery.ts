import { BOOKS, FIELDS, SEARCH_TYPE } from "./constants";

import { Client } from "@elastic/elasticsearch";
import {
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/lib/api/types";

export const client = new Client({
  node: process.env.ELASTIC_SEARCH_URL,
  auth: {
    username: process.env.ELASTIC_SEARCH_USERNAME,
    password: process.env.ELASTIC_SEARCH_PASSWORD,
  },
});

const mapElasticSearchFields = {
  [FIELDS.CONTENT]: "post_content^3",
  [FIELDS.CENNI_STORICI]: "meta.acf_cenni_storici.value",
  [FIELDS.NOTE]: "meta.acf_cenni_notes.value",
};

const mapElasticSearchSourcesSlug = {
  [BOOKS.RSND1]: "vol1",
  [BOOKS.RSND2]: "vol2",
  [BOOKS.SUTRA]: "sdl",
  [BOOKS.GLOSSARIO]: "glossario",
};

const searchQuery = (
  textQuery: string,
  searchType: SEARCH_TYPE,
  fields: FIELDS[] = [FIELDS.CONTENT],
  sources: BOOKS[] = [BOOKS.RSND1],
  recipient: string = null,
  place: string = null,
  from: string = null,
  to: string = null
): SearchRequest => {
  let textQueryCopy = textQuery.concat();

  const queryFields = ["post_title^5"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  const querySources = sources.map(
    (source) => mapElasticSearchSourcesSlug[source]
  );

  let elasticQuery: SearchRequest = {
    query: {
      bool: {
        must: [],
        filter: [
          {
            terms: {
              "terms.category.slug": querySources,
            },
          },
        ],
      },
    },
    highlight: {
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fields: {
        post_content: {},
        post_title: {},
        "meta.acf_cenni_notes.value": {},
        "meta.acf_cenni_storici.value": {},
      },
    },
  };

  if (recipient) {
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      query_string: {
        query: recipient,
        fields: ["meta.acf_destinatario.value"],
      },
    });
  }

  if (from && to) {
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      range: {
        "meta.acf_data.value": { gte: from, lte: to },
      },
    });
  }

  if (place) {
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      term: {
        "meta.acf_luogo.value.raw": place,
      },
    });
  }

  const exactMatch = textQueryCopy?.match(/".*"!~/);

  exactMatch?.forEach((match) => {
    textQueryCopy = textQueryCopy.replace(match, "");

    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: match.replace('"', ""),
        type: "phrase",
        fields: queryFields,
      },
    });
  });

  if (textQueryCopy && searchType !== SEARCH_TYPE.EXACT)
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      query_string: {
        query: textQueryCopy,
        fields: queryFields,
        default_operator: searchType,
      },
    });

  if (textQueryCopy && searchType === SEARCH_TYPE.EXACT)
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQueryCopy,
        type: "phrase",
        fields: queryFields,
      },
    });

  return elasticQuery;
};

export default searchQuery;
