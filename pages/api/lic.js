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

    let result2 = await pool
      .request()
      .input("@uLogin", sql.VarChar(30), "support")
      .input("@uPassword", sql.VarChar(30), "pmtsupport")
      .input("@uIP", sql.VarChar(30), "46.72.64.63")
      .input("@uVersion", sql.VarChar(30), "8.105")
      .input("@uDBCode", sql.VarChar(30), "ABCDEF09")

      //.output("output_parameter", sql.VarChar(250))
      .execute("GenerateRescueLicenseWeb");

    //console.dir(result2);
    res.status(200).json({ result2 });
  } catch (err) {
    res.status(500).json({ message: err.message });

    // ... error checks
  }
}
