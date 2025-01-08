import { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "../../src/helpers";
import { verify } from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isEmpty(req.body.token)) {
    return res.status(401).json({ message: "A token is required for authentication" });
  }

  try {
    /** --------- check token and user -------------- */
    const decoded = verify(req.body.token, process.env.TOKEN_KEY as string);
    if (isEmpty(decoded)) {
      return res.status(401).json({ message: "Check token has failed" });
    }

    // You can add more logic here if needed, e.g., attaching user info to the request object
    res.status(200).json({ message: "Authentication successful" });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
}
