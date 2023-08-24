import { q } from "../../src/lib/db";
import isEmpty, { password } from "../../src/helpers";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  //const route = req.body.route;
  //console.log("==body==", req.body);
  //const prefix = req.body.locale === "en" ? `${req.body.locale}_` : "";

  const login = req.body.login;

  try {
    const querySql = `
       SELECT u.id,u.name,u.login
       FROM forum_user u 
       WHERE (login=? OR email=?) AND pwd = ?`;
    const result = await q({
      query: querySql,
      values: [login, login, req.body.password],
    });
    const user = !isEmpty(result[0]) ? { ...result[0] } : {};
    if (!isEmpty(user)) {
      // Create token
      const token = sign(user, process.env.TOKEN_KEY, {
        expiresIn: "48h",
      });
      // save user token
      user.token = token;
    }
    res.status(200).json({ ...user });
    //else res.status(400).json({ status: 400, message: "Id must be present" });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ ...error });
  }
}
