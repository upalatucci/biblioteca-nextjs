import { NextApiRequest, NextApiResponse } from "next";
import { FIELDS } from "@utils/constants";
import { highlighPost } from "lib/elastic";
import { getQueryParamAsArray } from "@utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchText = req.query.q as string;
    const postId = parseInt(req.query.postId as string);

    const fields = getQueryParamAsArray<FIELDS>(
      req.query.fields,
      FIELDS.CONTENT
    );

    const elasticResult = await highlighPost(postId, searchText, fields);

    res.status(200).json(elasticResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
