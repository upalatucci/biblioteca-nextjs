import { NextApiRequest, NextApiResponse } from "next";
import { BOOKS } from "@utils/constants";
import {
  client,
  DEFAULT_PAGE_SIZE,
  simpleSearchQuery,
} from "@utils/searchQuery";

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

    const pageQuery = parseInt(
      Array.isArray(req?.query?.page) ? req?.query?.page[0] : req?.query?.page
    );

    const page = pageQuery && !isNaN(pageQuery) ? pageQuery : 1;

    const elasticResult = await client.search({
      ...elasticQuery,
      size: DEFAULT_PAGE_SIZE,
      from: (page - 1) * DEFAULT_PAGE_SIZE,
      index: process.env.ELASTIC_SEARCH_INDEX,
      min_score: 5,
    });

    res.status(200).json(elasticResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
