import { q } from "../../lib/db";
import isEmpty, { password } from "../../helpers";
import { isValidEmail } from "../../validation/validators";

export default async function handler(req, res) {
  try {
    if (!isValidEmail(req.body.email)) throw new Error("SOMETHING_WRONG");

    let querySql = `
    SELECT bilet  
    FROM bilets_reg_users 
    WHERE status='1' AND bilet=?      
    LIMIT 1`;
    let result = await q({ query: querySql, values: [req.body.bilet] });
    if (isEmpty(result)) throw new Error("SOMETHING_WRONG");

    querySql = `
    SELECT email  
    FROM users 
    WHERE email=?      
    LIMIT 1`;
    result = await q({ query: querySql, values: [req.body.email] });
    if (!isEmpty(result)) throw new Error("EMAIL_EXISTS");

    try {
      querySql = `
       UPDATE bilets_reg_users 
       SET status='' 
       WHERE bilet=?`;
      await q({ query: querySql, values: [req.body.bilet] });
      const values = [
        req.body.email.split("@").shift().substring(0, 20) || null,
        req.body.email,
        password(req.body.password),
        req.body.name,
        req.body.jabber ?? null,
        "user",
        req.body.bilet,
        1,
        1,
      ];
      console.log("values", values);
      querySql = `
       INSERT INTO users
          (
          login,
          email,
          passwd,
          name,
          jabber,
          tip_user,
          
          bilet,
          status,
          group_id
          )
        VALUES
          (?,?,?,?,?,?,?,?,?)`;
      result = await q({ query: querySql, values });
      if (result.affectedRows === 1) res.status(200).json({ result: "ok" });
      else throw new Error("Something went wrong");
      //console.log("--", typesDecr, types, orders);
    } catch (error) {
      // unhide to check error
      res.status(500).json({ message: error.message });
    }

    //console.log("--", typesDecr, types, orders);
  } catch (error) {
    // unhide to check error
    res.status(400).json({ message: error.message });
  }
}
