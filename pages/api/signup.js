import { q } from "../../src/lib/db";
import isEmpty, { clientIp } from "../../src/helpers";
import { isValidEmail } from "../../src/validation/validators";
import SENDMAIL from "../../src/helpers/mail";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  try {
    if (!isValidEmail(req.body.email)) {
      throw new Error("SOMETHING_WRONG");
    }
    //console.log("-- req.body --\n", req.body);

    // let querySql = `
    // SELECT bilet
    // FROM bilets_reg_users
    // WHERE status='1' AND bilet=?
    // LIMIT 1`;
    // let result = await q({ query: querySql, values: [req.body.bilet] });
    // if (isEmpty(result)) throw new Error("SOMETHING_WRONG");

    let querySql = `
      SELECT email  
      FROM forum_user 
      WHERE email=?      
      LIMIT 1`;
    let result = await q({ query: querySql, values: [req.body.email] });
    if (!isEmpty(result)) {
      console.log("-- EMAIL_EXISTS --\n", result);
      throw new Error("EMAIL_EXISTS");
    }

    try {
      const cookie_id = md5(new Date().getTime());
      const login = req.body.email.replace("@", "_");
      const values = [
        login,
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.phone,

        req.body.country_id,
        req.body.town,
        req.body.address,
        req.body.company,

        req.body.ip,
        req.body.link ?? "",

        req.body.email,
        "0000-00-00 00:00:00",
        cookie_id,
      ];

      //console.log("-- insert --\n", values);
      querySql = `
       INSERT INTO forum_user
          (
          login,
          email,
          pwd,
          name,
          phone,

          country_id,
          town,
          address,
          company,

          ipaddress,
          link, 
          
          email_extra,
          change_pass_date,
          
          insert_date,
          timestamp,
          cookie_id
          )
        VALUES
          (?,?,?,?,?,
           ?,?,?,?,
           ?,?, 
           ?,?,
           now(),now(),?)`;
      result = await q({ query: querySql, values });

      if (result.affectedRows === 1) {
        const token = sign(
          {
            id: result.insertId,
            name: req.body.name,
            login,
            email: req.body.email,
            phone: req.body.phone,
            country_id: req.body.country_id,
            town: req.body.town,
            address: req.body.address,
            company: req.body.company,
            link: req.body.link,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "360d",
          }
        );
        const cookieExpiresIn =
          new Date().getTime() + 60 * 1000 * 60 * 24 * 30 * 12;
        // set cookie
        setCookie("cookie_auth_id", cookie_id, {
          req,
          res,
          maxAge: cookieExpiresIn,
        });
        setCookie("cookie_login", login, {
          req,
          res,
          maxAge: cookieExpiresIn,
        });

        /** --------- send mail -------------- */

        const options = {
          from: `${req.body.name}<${req.body.email}>`, // sender address
          to: "oleglambin@gmail.com", // receiver email
          subject: "New registarition", // Subject line
          text: `User ${req.body.name}`,
          //html: HTML_TEMPLATE(req.body.message),
        };

        SENDMAIL(options, (info, error) => {
          if (info != null) {
            console.log("info send enail: ", info);
          } else if (error != null) {
            //throw new Error("error send mail");
            console.error("Error:", error);
          }
        });

        /** --------- END send mail -------------- */
        //console.log(" --- token --- \n", token);

        res.status(200).json({ result: "ok", token, id: result.insertId });
      } else {
        throw new Error("SOMETHING_WRONG");
      }
    } catch (error) {
      // unhide to check error
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    // unhide to check error
    res.status(400).json({ message: error.message });
  }
}
