import { q } from "../../src/lib/db";
import isEmpty, { password } from "../../src/helpers";
import { sign } from "jsonwebtoken";
// import { setCookie } from "cookies-next";
// import md5 from "md5";

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

      const payload = {
        sub: user.login,
        nonce: `${user.id}${user.login}`,
        given_name: user.name.split(" ")[0],
        family_name: user.name.split(" ")[1],
        email: user.email,
      };

      const privateKey =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2afgN52RvKYLyL+MF5FLBF09ql0wZW/qZ1Hc3IajHzY0dp9U4eN34G3KY1xIPZTE55ml9UkhkkoL+U1kEBkHTC0hgwi9Z9Tn6f+VPyHodR/BuslzUq2D1QGtEsJN4TNBEhgqNhvdByYUT5XCDr+g3Z6DPg63TrvUKI90yUO4MZVEiBjxXuzfRtpjfLqox3W4/TI5x9LG8gGduN4AE3rRRQRobwtaQ8I6qx/gb5CncPUf7OVli8BTYVT3g7twgzUg12+3P3EoBcbskKg7KnES8QJMwq5NULGSxMFV7u8oaipP6EjCcaBLRtieYxXOvHq9H7xgsyTnd/pBEDUyGmMscQIDAQAB";
      const tokenFD = sign(payload, privateKey);

      console.log({ ...user, tokenFD });
      res.status(200).json({ ...user, tokenFD });
    } else res.status(200).json(null);
  } catch (error) {
    // unhide to check error
    res.status(500).json({ ...error });
  }
}
