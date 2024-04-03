import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
import SENDMAIL, { HTML_TEMPLATE } from "../../src/helpers/mail";
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
        name,
        email

       FROM forum_user u 
       WHERE login=? OR email=?
       LIMIT 1`;
    const result = await q({
      query: querySql,
      values: [login, login],
    });

    const user = !isEmpty(result[0]) ? { ...result[0] } : {};
    //console.log("user", user);

    if (!isEmpty(user)) {
      /** --------- send mail -------------- */
      const text = `Ваш пароль: ${user.pwd}\n\n <br/><br/>Это письмо сформировано автоматически, отвечать на него не нужно.`;
      const options = {
        from: "support<support@pmtech.ru>", // sender address
        to: user.email, // receiver email
        subject: "PMT Support", // Subject line
        text,
        html: HTML_TEMPLATE(text),
      };

      SENDMAIL(options, (info, error) => {
        if (info != null) {
          console.log("info send enail: ", info);
        } else if (error != null) {
          console.log("error send mail", error);
          //throw new Error("error send mail");
          throw new Error({ error: "error send mail" });
        }
      });
      res.status(200).json({ sended: "true" });
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    // unhide to check error
    console.log(error);
    res.status(500).json({ ...error });
  }
}
