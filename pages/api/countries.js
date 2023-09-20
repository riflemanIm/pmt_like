import { q } from "../../src/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
    SELECT id, rus 
    FROM forums_phone_countries 
    WHERE is_show='Y' 
    ORDER by rus`;
    const result = await q({
      query: querySql,
    });
    res.status(200).json(result);
  } catch (error) {
    // unhide to check error
    res.status(500).json({ ...error });
  }
}
