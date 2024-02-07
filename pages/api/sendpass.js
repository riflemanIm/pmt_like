import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
import SENDMAIL from "../../src/helpers/mail";
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
        pwd,
        name

       FROM forum_user u 
       WHERE login=? OR email=?
       LIMIT 1`;
    const result = await q({
      query: querySql,
      values: [login, login],
    });

    const user = !isEmpty(result[0]) ? { ...result[0] } : {};
    console.log("user", user);
    if (!isEmpty(user)) {
      /** --------- send mail -------------- */

      const options = {
        from: `${user.name}<${user.email}>`, // sender address
        to: "oleglambin@gmail.com", // receiver email
        subject: "PMT Support", // Subject line
        text: `Пароль: ${user.pwd}`,
        //html: HTML_TEMPLATE(req.body.message),
      };

      SENDMAIL(options, (info, error) => {
        if (info != null) {
          console.log("info send enail: ", info);
          res.status(200).json({ sended: "true" });
        } else if (error != null) {
          console.log("error send mail", error);
          //throw new Error("error send mail");
        }
      });
    } else {
      throw new Error("EMAIL_DOESNT_EXISTS");
    }
  } catch (error) {
    // unhide to check error
    console.log(error);
    res.status(500).json({ ...error });
  }
}
