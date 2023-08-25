const sql = require("mssql");

export default async function handler(req, res) {
  //const route = req.body.route;
  //console.log("==body==", req.body);
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

    // let result1 = await pool.request().query("select * from temp ");

    // console.dir(result1);

    // // Stored procedure
    // // Output example
    // const output = {
    //   result2: {
    //     recordsets: [
    //       [
    //         {
    //           ExitCode: 0,
    //           DemoLicense:
    //             "34E85FECA7A588D887EE0D8752B2763EF9411A0C128F0D10227B7442FE8AEE8C27830E101E8FB7E1D4C4A061425861D9C20C500B2BA67F398C57CF9339617CE95FE5CF59280029D9F8BC2724",
    //         },
    //       ],
    //     ],
    //     recordset: [
    //       {
    //         ExitCode: 0,
    //         DemoLicense:
    //           "34E85FECA7A588D887EE0D8752B2763EF9411A0C128F0D10227B7442FE8AEE8C27830E101E8FB7E1D4C4A061425861D9C20C500B2BA67F398C57CF9339617CE95FE5CF59280029D9F8BC2724",
    //       },
    //     ],
    //     output: {},
    //     rowsAffected: [2, 1, 0, 1, 1, 1, 1],
    //     returnValue: 0,
    //   },
    // };

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
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });

    // ... error checks
  }
}
