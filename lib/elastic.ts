import { FIELDS, SEARCH_TYPE } from "../utils/constants";

import { Client } from "@elastic/elasticsearch";
import {
  QueryDslOperator,
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/lib/api/types";
import { PostType } from "@utils/elasticSearchUtils";

export const DEFAULT_PAGE_SIZE = 20;

export const client = new Client({
  node: process.env.ELASTIC_SEARCH_URL,
  auth: {
    username: process.env.ELASTIC_SEARCH_USERNAME,
    password: process.env.ELASTIC_SEARCH_PASSWORD,
  },
});

const mapElasticSearchFields = {
  [FIELDS.CONTENT]: "post_content_filtered",
  [FIELDS.CENNI_STORICI]: "meta.acf_cenni_storici.value",
  [FIELDS.NOTE]: "meta.acf_note.value",
};

const addWeights = (fields: string[]): string[] => {
  return fields.map((field) => {
    if (field.startsWith("post_title")) return field + "^5";

    if (field.startsWith("post_content")) return field + "^3";

    return field;
  });
};

export const highlighPost = (
  postId: number,
  textQuery: string,
  fields: FIELDS[],
  searchType: SEARCH_TYPE
) => {
  const queryFields = ["post_title"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  const elasticQuery = {
    query: {
      bool: {
        should: [],
        filter: [{ term: { ID: postId } }],
      },
    },
    highlight: {
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      number_of_fragments: 0,
      fields: {
        post_content_filtered: {},
        post_title: {},
        "post_content_filtered.exact": {},
        "post_title.exact": {},
        "meta.acf_note.value": {},
        "meta.acf_note.value.exact": {},
        "meta.acf_cenni_storici.value": {},
        "meta.acf_cenni_storici.value.exact": {},
      },
    },
    index: process.env.ELASTIC_SEARCH_INDEX,
  };

  if (textQuery && !searchType)
    (elasticQuery.query.bool.should as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQuery,
        fields: addWeights(queryFields),
        slop: 1,
        minimum_should_match: "100%",
      },
    });

  if (textQuery && searchType === SEARCH_TYPE.AND)
    (elasticQuery.query.bool.should as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQuery,
        fields: addWeights(queryFields),
        operator: searchType as QueryDslOperator,
        fuzziness: 1,
        max_expansions: 10,
        slop: 1,
      },
    });

  if (textQuery && searchType === SEARCH_TYPE.OR)
    (elasticQuery.query.bool.should as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQuery,
        fields: addWeights(queryFields),
        operator: searchType as QueryDslOperator,
      },
    });

  if (textQuery && searchType === SEARCH_TYPE.EXACT) {
    (elasticQuery.query.bool.should as QueryDslQueryContainer[]).push({
      query_string: {
        query: `"${textQuery}"`,
        fields: addWeights(queryFields.map((field) => field + ".exact")),
      },
    });
  }

  console.log(elasticQuery?.query?.bool?.should);

  return client.search(elasticQuery);
};

export const simpleSearchQuery = (
  textQuery: string,
  sources: PostType[]
): SearchRequest => {
  const query: SearchRequest = {
    min_score: 0.1,
    aggs: {
      book: {
        terms: {
          field: "post_type.raw",
        },
      },
    },
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: textQuery,
              fields: [
                "post_title^5",
                "post_content_filtered^3",
                "meta.acf_cenni_storici.value",
                "meta.acf_note.value",
              ],
              slop: 1,
              minimum_should_match: "100%",
            },
          },
        ],
      },
    },
    highlight: {
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fields: {
        post_content_filtered: {},
        post_title: {},
        "meta.acf_note.value": {},
        "meta.acf_cenni_storici.value": {},
      },
    },
  };

  if (sources) {
    query.post_filter = {
      terms: {
        "post_type.raw": sources,
      },
    };
  }

  return query;
};

const searchQuery = (
  textQuery: string,
  searchType: SEARCH_TYPE,
  fields: FIELDS[] = [FIELDS.CONTENT],
  sources: PostType[],
  recipient: string = null,
  place: string = null,
  from: string = null,
  to: string = null
): SearchRequest => {
  const textQueryCopy = textQuery.concat();

  const queryFields = ["post_title"].concat(
    fields.map((field) => mapElasticSearchFields[field])
  );

  const elasticQuery: SearchRequest = {
    min_score: 0.1,
    aggs: {
      book: {
        terms: {
          field: "post_type.raw",
        },
      },
    },
    query: {
      bool: {
        must: [],
        should: [],
        filter: [],
      },
    },
    highlight: {
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fields: {
        post_content_filtered: {},
        post_title: {},
        "post_content_filtered.exact": {},
        "post_title.exact": {},
        "meta.acf_note.value": {},
        "meta.acf_note.value.exact": {},
        "meta.acf_cenni_storici.value": {},
        "meta.acf_cenni_storici.value.exact": {},
      },
    },
  };

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

  if (textQueryCopy && searchType === SEARCH_TYPE.AND)
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQueryCopy,
        fields: addWeights(queryFields),
        operator: searchType as QueryDslOperator,
        fuzziness: 1,
        max_expansions: 10,
        slop: 1,
      },
    });

  if (textQueryCopy && searchType === SEARCH_TYPE.OR)
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      multi_match: {
        query: textQueryCopy,
        fields: addWeights(queryFields),
        operator: searchType as QueryDslOperator,
      },
    });

  if (textQueryCopy && searchType === SEARCH_TYPE.EXACT) {
    (elasticQuery.query.bool.must as QueryDslQueryContainer[]).push({
      query_string: {
        query: `"${textQuery}"`,
        fields: addWeights(queryFields.map((field) => field + ".exact")),
      },
    });
  }

  if (sources) {
    elasticQuery.post_filter = {
      bool: {
        must: [
          {
            terms: {
              "post_type.raw": sources,
            },
          },
        ],
      },
    };
  }

  if (recipient) {
    (elasticQuery.post_filter.bool.must as QueryDslQueryContainer[]).push({
      query_string: {
        query: recipient,
        fields: ["meta.acf_destinatario.value"],
      },
    });
  }

  if (from && to) {
    (elasticQuery.post_filter.bool.must as QueryDslQueryContainer[]).push({
      range: {
        "meta.acf_data.value": { gte: from, lte: to },
      },
    });
  }

  if (place) {
    (elasticQuery.post_filter.bool.must as QueryDslQueryContainer[]).push({
      term: {
        "meta.acf_luogo.value.raw": place,
      },
    });
  }

  return elasticQuery;
};

export default searchQuery;
