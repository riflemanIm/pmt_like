import isEmpty, { clientIp } from "../../src/helpers";
import SENDMAIL from "../../src/helpers/mail";
const sql = require("mssql");

export default async function handler(req, res) {
  if (isEmpty(req.body.user.token)) {
    res.status(401).json({ message: "A token is required for authentication" });
  }

  try {
    /** --------- check token and user -------------- */
    const decoded = verify(token, process.env.TOKEN_KEY);
    const querySql = `
      SELECT u.id
      FROM forum_user u 
      WHERE u.id=? and u.login=? and u.name=?`;

    let result = await q({
      query: querySql,
      values: [decoded.id, decoded.login, decoded.name],
    });

    if (isEmpty(result)) {
      res.status(401).json({ message: "The user is not logged in" });
    }
    /** --------- gettingn Rescue License fron mssql -------------- */
    const config = {
      user: "pmtsite",
      password: "licretreiver",
      server: "10.1.1.6", // You can use 'localhost\\instance' to connect to named instance
      database: "CB",
      options: {
        encrypt: false,
      },
    };

    let pool = await sql.connect(config);
    const ip = clientIp(req);
    console.log("==ip==", ip);

    result = await pool
      .request()
      .input("uLogin", sql.VarChar(30), req.body.login)
      .input("uPassword", sql.VarChar(30), req.body.password)
      .input("uIP", sql.VarChar(30), ip)
      .input("uVersion", sql.VarChar(30), req.body.version)
      .input("uDBCode", sql.VarChar(30), req.body.code)
      .execute("GenerateRescueLicenseWeb");

    if (result.recordset[0].ExitCode) {
      throw new Error(
        "В настоящее время получить лицензию невозможно. Повторите попытку позже.\n"
      );
    }

    /** --------- send mail -------------- */

    const options = {
      from: `${req.body.user.login}<${req.body.user.email}>`, // sender address
      to: "oleglambin@gmail.com", // receiver email
      subject: "Site send GenerateRescueLicenseWeb", // Subject line
      text: result.recordset[0].DemoLicense,
      //html: HTML_TEMPLATE(req.body.message),
    };

    SENDMAIL(options, (info, error) => {
      if (info != null) {
        console.log("info send enail: ", info);
      } else if (error != null) {
        throw new Error("error send mail");
      }
    });

    res.status(200).json({
      lic: result.recordset[0].DemoLicense,
      token: req.body.user.token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
