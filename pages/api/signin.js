import { q } from "../../src/lib/db";
import isEmpty, { getParam } from "../../src/helpers";
import { sign } from "jsonwebtoken";
// import { setCookie } from "cookies-next";
// import md5 from "md5";
import fs from "fs";
import axios from "axios";

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
        link

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
        expiresIn: "360d",
      });

      // save user token
      user.token = token;

      // // -------------- add cookies like in last project in  PHP  --------------
      // // cookie expires time plus year
      // const cookieExpiresIn =
      //   new Date().getTime() + 60 * 1000 * 60 * 24 * 30 * 12;

      // // cookie id
      // const cookie_id = md5(new Date().getTime());

      // // update user
      // querySql = `
      //   UPDATE forum_user
      //   SET timestamp=now(), cookie_id=?
      //   WHERE id=?`;
      // await q({
      //   query: querySql,
      //   values: [cookie_id, user.id],
      // });

      // // set cookie
      // setCookie("cookie_auth_id", cookie_id, {
      //   req,
      //   res,
      //   maxAge: cookieExpiresIn,
      // });
      // setCookie("cookie_login", login, {
      //   req,
      //   res,
      //   maxAge: cookieExpiresIn,
      // });
      // // -------------- END add cookies like in last project in PHP  --------------

      const authClientUrl =
        "https://medialog.myfreshworks.com/sp/OIDC/660514868944331049/login?slug=1703779775100&redirect_uri=https%3A%2F%2Fmedialog.freshdesk.com%2Ffreshid%2Fcustomer_authorize_callback%3Fhd%3Dsupport.medialog.ru&client_id=451979510707337272";
      try {
        let qqq = await axios.get(authClientUrl);
        if (!qqq.request.res.responseUrl) {
          throw new Error("responseUrl in empty");
        }

        res
          .status(200)
          .json({ ...user, redirectUrl: qqq.request.res.responseUrl });
      } catch (error) {
        console.log("getServerSideProps error", error);
      }
    } else res.status(200).json(null);
  } catch (error) {
    // unhide to check error
    console.log(error);
    res.status(500).json({ ...error });
  }
}
