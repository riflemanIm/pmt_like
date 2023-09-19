import SENDMAIL, { HTML_TEMPLATE } from "../../src/helpers/mail";
const sql = require("mssql");

export default async function handler(req, res) {
  //const route = req.body.route;
  console.log("==body==", req.body);
  //const prefix = req.body.locale === "en" ? `${req.body.locale}_` : "";

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

    const result = await pool
      .request()
      .input("uLogin", sql.VarChar(30), "support")
      .input("uPassword", sql.VarChar(30), "pmtsupport")
      .input("uIP", sql.VarChar(30), "46.72.64.63")
      .input("uVersion", sql.VarChar(30), "8.105")
      .input("uDBCode", sql.VarChar(30), "ABCDEF09")

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
        from: `${req.body.user.name}<${req.body.user.email}>`, // sender address
        to: "oleglambin@gmail.com", // receiver email
        subject: "Site form", // Subject line
        text: req.body.message,
        html: HTML_TEMPLATE(req.body.message),
      };

      SENDMAIL(options, (info, error) => {
        if (info != null) {
          console.log("Email sent successfully");
          // console.log("info: ", info);
          res
            .status(200)
            .json({
              lic: result.recordset[0].DemoLicense,
              token: req.body.user.token,
            });
        } else if (error != null) {
          res
            .status(500)
            .json({
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
