import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.REVALIDATE_SECRET?.length) {
    return res.status(401).json({ message: "Secret not set" });
  }

  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const pathToRevalidate = req.query.path as string;
    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error revalidating",
      error: error.message,
      stackTrace: error.stack,
    });
  }
}
