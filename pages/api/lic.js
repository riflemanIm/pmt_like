import isEmpty, { clientIp } from "../../src/helpers";
import SENDMAIL from "../../src/helpers/mail";
const sql = require("mssql");

export default async function handler(req, res) {
  if (isEmpty(req.body.user.token)) {
    res.status(401).json({ message: "A token is required for authentication" });
  }

  //  const login = req.body.login;
  const config = {
    user: "pmtsite",
    password: "licretreiver",
    server: "10.1.1.6", // You can use 'localhost\\instance' to connect to named instance
    database: "CB",
    options: {
      encrypt: false,
    },
  };
  try {
    let pool = await sql.connect(config);
    const ip = clientIp(req);
    console.log("==ip==", ip);

    const result = await pool
      .request()
      .input("uLogin", sql.VarChar(30), req.body.login)
      .input("uPassword", sql.VarChar(30), req.body.password)
      .input("uIP", sql.VarChar(30), ip)
      .input("uVersion", sql.VarChar(30), req.body.version)
      .input("uDBCode", sql.VarChar(30), req.body.code)

      //.output("output_parameter", sql.VarChar(250))
      .execute("GenerateRescueLicenseWeb");

    //console.dir(result);
    if (result.recordset[0].ExitCode) {
      throw new Error(
        "В настоящее время получить лицензию невозможно. Повторите попытку позже.\n"
      );
    }

    /** --------- send mail -------------- */
    try {
      const options = {
        from: `${req.body.user.login}<${req.body.user.email}>`, // sender address
        to: "oleglambin@gmail.com", // receiver email
        subject: "Site send GenerateRescueLicenseWeb", // Subject line
        text: result.recordset[0].DemoLicense,
        //html: HTML_TEMPLATE(req.body.message),
      };

      SENDMAIL(options, (info, error) => {
        if (info != null) {
          console.log("Email sent successfully");
          // console.log("info: ", info);
          res.status(200).json({
            lic: result.recordset[0].DemoLicense,
            token: req.body.user.token,
          });
        } else if (error != null) {
          res.status(500).json({
            sent: "error send mail",
            error,
            token: req.body.user.token,
          });
        }
      });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ message: error.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });

    // ... error checks
  }
}
