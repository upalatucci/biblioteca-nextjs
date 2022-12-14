import { NextApiRequest, NextApiResponse } from "next";
import { client, DEFAULT_PAGE_SIZE, simpleSearchQuery } from "lib/elastic";
import { getQueryParamAsArray } from "@utils/utils";
import { PostType } from "@utils/elasticSearchUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.q as string;

    const sources = getQueryParamAsArray<PostType>(req.query.sources);

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
    });

    res.status(200).json(elasticResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
