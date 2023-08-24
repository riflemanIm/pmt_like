const sql = require("mssql");

export default async function handler(req, res) {
  //const route = req.body.route;
  //console.log("==body==", req.body);
  //const prefix = req.body.locale === "en" ? `${req.body.locale}_` : "";

  //  const login = req.body.login;

  try {
    let pool = await sql.connect(config);
    let result1 = await pool
      .request()
      .input("input_parameter", sql.Int, value)
      .query("select * from mytable where id = @input_parameter");

    console.dir(result1);

    // Stored procedure

    let result2 = await pool
      .request()
      .input("input_parameter", sql.Int, value)
      .output("output_parameter", sql.VarChar(50))
      .execute("procedure_name");

    console.dir(result2);
  } catch (err) {
    // ... error checks
  }
}
