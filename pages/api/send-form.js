import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
import SENDMAIL, { HTML_TEMPLATE } from "../../src/helpers/mail";

export default async function handler(req, res) {
  try {
    let query = `
            SELECT bilet
            FROM bilets_reg_users 
            WHERE status='1' AND bilet=?      
            LIMIT 1`;

    let result = await q({ query, values: [req.body.bilet] });

    if (isEmpty(result)) throw new Error("REFRESH");

    /** --------- send mail -------------- */

    const options = {
      from: `${req.body.name}<${req.body.email}>`, // sender address
      to: "support@openvpn.ru", // receiver email
      subject: "Site form", // Subject line
      text: req.body.message,
      html: HTML_TEMPLATE(req.body.message),
    };

    SENDMAIL(options, (info, error) => {
      if (info != null) {
        console.log("Email sent successfully");
        // console.log("info: ", info);
        res.status(200).json({ sent: "ok", info });
      } else if (error != null) {
        throw new Error("Error sending mail");
      }
    });
  } catch (error) {
    // unhide to check error
    res.status(400).json({ message: error.message });
  }
}
