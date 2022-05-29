import { NextApiRequest, NextApiResponse } from "next";
import { BOOKS } from "../../utils/constants";
import { client, simpleSearchQuery } from "../../utils/searchQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.q as string;

    const sources = Array.isArray(req.query.sources)
      ? (req.query.sources as BOOKS[])
      : [(req.query.sources as BOOKS) || BOOKS.RSND];

    const elasticQuery = simpleSearchQuery(searchText, sources);

    const elasticResult = await client.search({
      ...elasticQuery,
      index: process.env.ELASTIC_SEARCH_INDEX,
    });

    res.status(200).json(elasticResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
