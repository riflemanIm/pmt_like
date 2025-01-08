import { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
//import SENDMAIL from "../../src/helpers/mail";
import { verify } from "jsonwebtoken";
import sql from "mssql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isEmpty(req.body.user.token)) {
    return res.status(401).json({ message: "A token is required for authentication" });
  }

  try {
    /** --------- check token and user -------------- */
    const decoded = verify(req.body.user.token, process.env.TOKEN_KEY as string) as { id: string, login: string, name: string };
    const querySql = `
      SELECT u.id
      FROM forum_user u 
      WHERE u.id=? and u.login=? and u.name=?`;

    const result = await q({
      query: querySql,
      values: [decoded.id, decoded.login, decoded.name],
    });

    if (isEmpty(result)) {
      return res.status(401).json({ message: "The user is not logged in" });
    }

    /** --------- getting Rescue or Demo License from mssql -------------- */
    const config: sql.config = {
      user: "pmtsite",
      password: "licretreiver",
      server: "10.1.1.6", // You can use 'localhost\\instance' to connect to named instance
      database: "CB",
    };

    // Add your logic for fetching license from MSSQL here

    res.status(200).json({ message: "License fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
}
