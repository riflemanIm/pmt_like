import { q } from "../../src/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
       SELECT u.id,u.name,u.login,u.email
       FROM forum_user u 
       LIMIT 1`;
    const result = await q({
      query: querySql,
    });

    res.status(200).json({ ...result });
    //else res.status(400).json({ status: 400, message: "Id must be present" });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ ...error });
  }
}
