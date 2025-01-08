import { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const querySql = `
    SELECT id, rus 
    FROM forums_phone_countries 
    WHERE is_show='Y' 
    ORDER by rus`;
    const result = await q({
      query: querySql,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Database query error: ${(error as Error).message}` });
  }
}
