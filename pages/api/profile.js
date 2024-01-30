import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";
import { isValidEmail } from "../../src/validation/validators";

export default async function handler(req, res) {
  try {
    if (!isValidEmail(req.body.email)) {
      throw new Error("SOMETHING_WRONG");
    }
    if (isEmpty(req.body.id)) {
      throw new Error("SOMETHING_WRONG");
    }

    // console.log("-- req.body --\n", req.body);

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
      WHERE email=? AND id!=?   
      LIMIT 1`;

    let result = await q({
      query: querySql,
      values: [req.body.email, req.body.id],
    });

    if (!isEmpty(result)) {
      throw new Error("EMAIL_EXISTS");
    }

    try {
      const values = [
        req.body.email,
        req.body.name,
        req.body.phone,

        req.body.country_id,
        req.body.town,
        req.body.address,
        req.body.company,

        req.body.ip,
        req.body.link ?? "",

        req.body.email,
        req.body.id,
      ];

      console.log("-- values --\n", values);

      querySql = `
      UPDATE forum_user
      SET          
          email=?,          
          name=?,
          phone=?,

          country_id=?,
          town=?,
          address=?,
          company=?,

          ipaddress=?,
          link=?, 
          
          email_extra=?
                  
        WHERE id=?`;

      result = await q({ query: querySql, values });
      //console.log(" --- result --- \n", result);

      if (result.affectedRows === 1)
        res.status(200).json({ result: "ok_update" });
      else throw new Error("SOMETHING_WRONG");
    } catch (error) {
      // unhide to check error
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    // unhide to check error
    res.status(400).json({ message: error.message });
  }
}
