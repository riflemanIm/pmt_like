import { q } from "../../src/lib/db";
import isEmpty, { getParam } from "../../src/helpers";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";
// import md5 from "md5";

export default async function handler(req, res) {
  //const route = req.body.route;
  console.log("==body==", req.body);
  //const prefix = req.body.locale === "en" ? `${req.body.locale}_` : "";

  try {
    let querySql = `
       SELECT 
        id,
        name,
        pwd,
        login,
        email,
        phone,
        country_id,        
        town,
        address,
        company,
        link
       FROM forum_user u 
       WHERE email=?
       LIMIT 1`;
    const result = await q({
      query: querySql,
      values: [req.body.email],
    });

    const user = !isEmpty(result[0]) ? { ...result[0] } : {};

    if (!isEmpty(user)) {
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    // unhide to check error
    console.log(error);
    res.status(500).json({ ...error });
  }
}
