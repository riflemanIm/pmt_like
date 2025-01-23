import { q } from "../../src/lib/db";
import isEmpty, { getParam } from "../../src/helpers";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";

// ALTER TABLE `pmtechru_utf`.`forum_user`
// ADD COLUMN `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user' AFTER `change_pass_date`;

export default async function handler(req, res) {
  //const route = req.body.route;
  //console.log("==body==", req.body);
  //const prefix = req.body.locale === "en" ? `${req.body.locale}_` : "";

  const login = req.body.login;

  try {
    let querySql = `
       SELECT 
        id,
        name,
        login,
        email,
        phone,
        country_id,        
        town,
        address,
        company,
        link,
        role

       FROM forum_user u 
       WHERE (login=? OR email=?) AND pwd = ?
       LIMIT 1`;
    const result = await q({
      query: querySql,
      values: [login, login, req.body.password],
    });
    const user = !isEmpty(result[0]) ? { ...result[0] } : {};

    if (!isEmpty(user)) {
      // Create token
      const token = sign(user, process.env.TOKEN_KEY, {
        expiresIn: "31d",
      });

      // save user token
      user.token = token;

      // cookie expires 3d
      const cookieExpiresIn = new Date().getTime() + 60 * 1000 * 60 * 24 * 3;
      setCookie("user", JSON.stringify(user), {
        req,
        res,
        maxAge: cookieExpiresIn,
      });
      res.status(200).json(user);
    } else res.status(200).json(null);
  } catch (error) {
    // unhide to check error
    console.log(error);
    res.status(500).json({ ...error });
  }
}
