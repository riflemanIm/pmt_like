import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  if (isEmpty(req.body.token)) {
    res.status(401).json({ message: "A token is required for authentication" });
  }

  try {
    /** --------- check token and user -------------- */
    const decoded = verify(req.body.token, process.env.TOKEN_KEY);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
