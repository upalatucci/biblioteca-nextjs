// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from "node-fetch";

const authorization = btoa(
  `${process.env.ELASTIC_SEARCH_USERNAME}:${process.env.ELASTIC_SEARCH_PASSWORD}`
);
const Headers = {
  Authorization: `Basic ${authorization}`,
};

export default async function handler(req, res) {
  const elasticQuery = {
    query: {
      match_phrase: {
        post_content:
          "sicuramente la suprema illuminazione in questa esistenza",
      },
    },
  };

  console.log(
    `${process.env.ELASTIC_SEARCH_URL}/${process.env.ELASTIC_SEARCH_INDEX}/_search`
  );

  const elasticResponse = await fetch(
    `${process.env.ELASTIC_SEARCH_URL}/${process.env.ELASTIC_SEARCH_INDEX}/_search`,
    {
      method: "POST",
      headers: {
        ...Headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(elasticQuery),
    }
  );

  const elasticJsonResponse = await elasticResponse.json();

  res.status(200).json(elasticJsonResponse);
}
