import { BOOKS, FIELDS, SEARCH_TYPE } from "../utils/constants";

import { Client } from "@elastic/elasticsearch";
import {
  QueryDslOperator,
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/lib/api/types";

export const DEFAULT_PAGE_SIZE = 20;

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
  [FIELDS.NOTE]: "meta.acf_note.value",
};

const mapElasticSearchSourcesSlug = (sources: BOOKS[]) => {
  return sources.reduce((elasticSources, source) => {
    switch (source) {
      case BOOKS.RSND:
        elasticSources.push("rsnd");
        break;
      case BOOKS.SUTRA:
        elasticSources.push("sdlpe");
        break;
      case BOOKS.GLOSSARIO:
        elasticSources.push("glossario");
        break;
    }
    return elasticSources;
  }, [] as string[]);
};

export const highlighPost = (
  postId: number,
  textQuery: string,
  fields: FIELDS[]
) => {
  const queryFields = ["post_title^5"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  return client.search({
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: textQuery,
              fields: queryFields,
              slop: 1,
              minimum_should_match: "100%",
            },
          },
        ],
        filter: [{ term: { ID: postId } }],
      },
    },

    highlight: {
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      number_of_fragments: 0,
      fields: {
        post_content: {},
        post_title: {},
        "meta.acf_note.value": {},
        "meta.acf_cenni_storici.value": {},
      },
    },
    index: process.env.ELASTIC_SEARCH_INDEX,
  });
};

export const simpleSearchQuery = (
  textQuery: string,
  sources: BOOKS[] = [BOOKS.RSND]
): SearchRequest => {
  const querySources = mapElasticSearchSourcesSlug(sources);

  return {
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: textQuery,
              fields: [
                "post_title^5",
                "post_content^3",
                "meta.acf_cenni_storici.value",
                "meta.acf_note.value",
              ],
              slop: 1,
              minimum_should_match: "100%",
            },
          },
        ],
        filter: [
          {
            query_string: {
              default_field: "post_type",
              query: querySources.join(" OR "),
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
        "meta.acf_note.value": {},
        "meta.acf_cenni_storici.value": {},
      },
    },
  };
};

const searchQuery = (
  textQuery: string,
  searchType: SEARCH_TYPE,
  fields: FIELDS[] = [FIELDS.CONTENT],
  sources: BOOKS[] = [BOOKS.RSND],
  recipient: string = null,
  place: string = null,
  from: string = null,
  to: string = null
): SearchRequest => {
  const textQueryCopy = textQuery.concat();

  const queryFields = ["post_title^5"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  const querySources = mapElasticSearchSourcesSlug(sources);

  const elasticQuery: SearchRequest = {
    min_score: 0.5,
    query: {
      bool: {
        must: [],
        should: [],
        filter: [
          {
            query_string: {
              default_field: "post_type",
              query: querySources.join(" OR "),
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
        "meta.acf_note.value": {},
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

  // if (from && to) {
  //   (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
  //     range: {
  //       "meta.acf_data.value": { gte: from, lte: to },
  //     },
  //   });
  // }

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

  if (textQueryCopy && [SEARCH_TYPE.OR, SEARCH_TYPE.AND].includes(searchType))
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQueryCopy,
        fields: queryFields,
        operator: searchType as QueryDslOperator,
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

  if (textQueryCopy && searchType === SEARCH_TYPE.BASE) {
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQuery,
        fields: queryFields,
        slop: 1,
        minimum_should_match: "100%",
      },
    });
  }

  return elasticQuery;
};

export default searchQuery;
