import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import searchQuery from "../../utils/searchQuery";

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
    let elasticQuery = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: req.query.q as string,
                fields: [
                  "post_title^5",
                  "post_content^3",
                  "meta.acf_cenni_storici.value",
                  "meta.acf_cenni_notes.value",
                ],
                fuzziness: "1",
                slop: "2",
                minimum_should_match: "75%",
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
        },
      },
    };

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
