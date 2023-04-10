import { NextApiRequest, NextApiResponse } from "next";
import { client } from "lib/elastic";
import { ElasticSearchPost } from "@utils/elasticSearchUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.term as string;
    const searchResult = await client.search<ElasticSearchPost>({
      query: {
        bool: {
          must: [
            {
              match_phrase_prefix: {
                post_title: {
                  query: searchText,
                },
              },
            },
          ],
          filter: {
            term: {
              post_type: "glossary",
            },
          },
        },
      },
      _source: ["post_title"],
      size: 5,
      from: 0,
      index: process.env.ELASTIC_SEARCH_INDEX,
    });

    res.status(200).json(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
