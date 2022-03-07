import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const authorization = Buffer.from(
  `${process.env.ELASTIC_SEARCH_USERNAME}:${process.env.ELASTIC_SEARCH_PASSWORD}`
).toString("base64");

const Headers = {
  Authorization: `Basic ${authorization}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let textQuery = req.query["q"] as string;

    let elasticQuery = {
      query: {
        bool: {
          must: [],
        },
      },
      highlight: {
        pre_tags : ["<span>"],
        post_tags : ["</span>"],
        fields : {
            post_content : {},
            post_title: {}
        }
      }
    };

    const exactMatch = textQuery?.match(/".*"/);

    exactMatch?.forEach((match) => {
      textQuery = textQuery.replace(match, "");

      elasticQuery.query.bool.must.push({
        multi_match: {
          query: match.replace('"', ""),
          type: "phrase",
          fields: ["post_content", "post_title^3"],
        },
      });
    });

    if (textQuery)
      elasticQuery.query.bool.must.push({
          query_string: {
            query: textQuery,
            fields: ["post_content", "post_title^3"]
        }
      });

    // il cosneguimento "la buddità"

    console.log("Search for", elasticQuery.query.bool.must);

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
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
