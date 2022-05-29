import { NextApiRequest, NextApiResponse } from "next";
import { BOOKS, FIELDS, SEARCH_TYPE } from "../../utils/constants";
import searchQuery, { client } from "../../utils/searchQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.q as string;
    const searchType = req.query.searchType as SEARCH_TYPE;

    const fields = Array.isArray(req.query.fields)
      ? (req.query.fields as FIELDS[])
      : [(req.query.fields as FIELDS) || FIELDS.CONTENT];
    const sources = Array.isArray(req.query.sources)
      ? (req.query.sources as BOOKS[])
      : [(req.query.sources as BOOKS) || BOOKS.RSND];

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
      elasticQuery.query.bool.must,
      elasticQuery.query.bool.filter[0].terms
    );

    const searchResult = await client.search({
      ...elasticQuery,
      index: process.env.ELASTIC_SEARCH_INDEX,
    });

    res.status(200).json(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
