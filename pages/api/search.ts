import { NextApiRequest, NextApiResponse } from "next";
import { FIELDS, SEARCH_TYPE } from "@utils/constants";
import searchQuery, { client, DEFAULT_PAGE_SIZE } from "lib/elastic";
import { getQueryParamAsArray } from "@utils/utils";
import { PostType } from "@utils/elasticSearchUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.q as string;
    const searchType = req.query.searchType as SEARCH_TYPE;

    const fields = getQueryParamAsArray<FIELDS>(
      req.query.fields,
      FIELDS.CONTENT
    );

    const sources = getQueryParamAsArray<PostType>(req.query.sources);

    const pageQuery = parseInt(
      Array.isArray(req?.query?.page) ? req?.query?.page[0] : req?.query?.page
    );

    const page = pageQuery && !isNaN(pageQuery) ? pageQuery : 1;

    const elasticQuery = searchQuery(
      searchText,
      searchType,
      fields,
      sources,
      req.query.recipient as string,
      req.query.place as string,
      req.query.from as string,
      req.query.to as string
    );

    console.log(
      "Search for",
      searchType,
      sources,
      elasticQuery.query.bool.should,
      elasticQuery.post_filter
    );

    const searchResult = await client.search({
      ...elasticQuery,
      size: DEFAULT_PAGE_SIZE,
      from: (page - 1) * DEFAULT_PAGE_SIZE,
      index: process.env.ELASTIC_SEARCH_INDEX,
    });

    res.status(200).json(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
