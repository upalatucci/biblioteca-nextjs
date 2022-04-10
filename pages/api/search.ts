import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import searchQuery from "../../utils/searchQuery";

const authorization = Buffer.from(
  `${process.env.ELASTIC_SEARCH_USERNAME}:${process.env.ELASTIC_SEARCH_PASSWORD}`
).toString("base64");

const Headers = {
  Authorization: `Basic ${authorization}`,
};

const fieldsMapping = {
  'destinatario': 'meta.acf_destinatario.value'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const elasticQuery = searchQuery(req.query.q as string)

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
