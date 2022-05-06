import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/searchQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const elasticResult = await client.search({
      index: process.env.ELASTIC_SEARCH_INDEX,

      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: req.query.q as string,
                fields: [
                  "post_title",
                  "post_content",
                  "meta.acf_cenni_storici.value",
                  "meta.acf_cenni_notes.value",
                ],
                fuzziness: "AUTO",
                slop: 1,
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
    });

    res.status(200).json(elasticResult);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
