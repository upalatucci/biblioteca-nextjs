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
  [FIELDS.CONTENT]: "post_content",
  [FIELDS.CENNI_STORICI]: "meta.acf_cenni_storici.value",
  [FIELDS.NOTE]: "meta.acf_cenni_notes.value",
};

const mapElasticSearchSourcesSlug = {
  [BOOKS.RSND1]: "vol1",
  [BOOKS.RSND2]: "vol2",
  [BOOKS.SUTRA]: "sdl",
  [BOOKS.GLOSSARIO]: "glossario",
};

export const simpleSearchQuery = (
  textQuery: string,
  sources: BOOKS[] = [BOOKS.RSND1]
): SearchRequest => {
  const querySources = sources.map(
    (source) => mapElasticSearchSourcesSlug[source]
  );

  return {
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: textQuery,
              fields: [
                "post_title",
                "post_content",
                "meta.acf_cenni_storici.value",
                "meta.acf_cenni_notes.value",
              ],
              fuzziness: "AUTO",
              slop: 1,
              minimum_should_match: "75%",
            },
          },
        ],
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

  const queryFields = ["post_title"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  const querySources = sources.map(
    (source) => mapElasticSearchSourcesSlug[source]
  );

  let elasticQuery: SearchRequest = {
    query: {
      bool: {
        must: [],
        should: [],
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

  // const exactMatch = textQueryCopy?.match(/".*"!~/);

  // exactMatch?.forEach((match) => {
  //   textQueryCopy = textQueryCopy.replace(match, "");

  //   (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
  //     multi_match: {
  //       query: match.replace('"', ""),
  //       type: "phrase",
  //       fields: queryFields,
  //     },
  //   });
  // });

  if (textQueryCopy && searchType !== SEARCH_TYPE.EXACT)
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQueryCopy,
        fields: queryFields,
        operator: searchType,
      },
    });

  if (textQueryCopy && searchType === SEARCH_TYPE.EXACT) {
    queryFields.forEach((field) => {
      (elasticQuery.query.bool.should as QueryDslQueryContainer[]).push({
        match_phrase: {
          [field.split("^")[0]]: {
            query: textQueryCopy,
            slop: 1,
          },
        },
      });
    });
  }

  return elasticQuery;
};

export default searchQuery;
