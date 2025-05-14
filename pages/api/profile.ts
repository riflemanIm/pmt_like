import type { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";
import isEmpty, { clientIp } from "../../src/helpers";
import { isValidEmail } from "../../src/validation/validators";
import SENDMAIL from "../../src/helpers/mail";
import md5 from "md5";
import { sign, verify } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// Editable user fields
interface UserBody {
  id?: number;
  email: string;
  name: string;
  phone: string;
  country_id: number;
  town: string;
  address: string;
  company: string;
  ip?: string;
  link?: string;
  password: string;
  role?: "admin" | "user";
}

// Signup-only fields
interface SignupRequest extends Omit<UserBody, "role" | "id"> {}

// Helper: verify JWT and extract user
function getUserFromReq(
  req: NextApiRequest
): RowDataPacket & { id: number; role: "admin" | "user" } {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    throw { status: 401, message: "Missing token" };
  }
  const token = auth.slice(7);
  try {
    const decoded = verify(token, process.env.TOKEN_KEY as string);
    if (typeof decoded === "string" || isEmpty(decoded)) {
      throw new Error("Invalid token payload");
    }
    return decoded as RowDataPacket & { id: number; role: "admin" | "user" };
  } catch (e: any) {
    const msg = e.message.includes("jwt")
      ? "Invalid or expired token"
      : e.message;
    throw { status: 401, message: msg };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const { id } = req.query as { id?: string };
        if (id) {
          const rows = await q<RowDataPacket[]>({
            query: "SELECT * FROM forum_user WHERE id = ?",
            values: [Number(id)],
          });
          if (rows.length === 0)
            return res.status(404).json({ message: "User not found" });
          return res.status(200).json(rows[0]);
        }
        // list all (admin only)
        const user = getUserFromReq(req);
        if (user.role !== "admin")
          return res.status(403).json({ message: "Forbidden" });
        const all = await q<RowDataPacket[]>({
          query: "SELECT * FROM forum_user",
        });
        return res.status(200).json(all);
      }

      case "POST": {
        // Determine if signup (no token) or admin-create
        let admin:
          | (RowDataPacket & { id: number; role: "admin" | "user" })
          | null = null;
        const auth = req.headers.authorization;
        if (auth?.startsWith("Bearer ")) {
          admin = getUserFromReq(req);
        }
        // If no admin, treat as signup
        if (!admin) {
          const body = req.body as SignupRequest;
          const {
            email,
            password,
            name,
            phone,
            country_id,
            town,
            address,
            company,
            link = "",
          } = body;
          if (!isValidEmail(email))
            return res.status(400).json({ message: "Invalid email" });
          const exists = await q<RowDataPacket[]>({
            query: "SELECT id FROM forum_user WHERE email = ? LIMIT 1",
            values: [email],
          });
          if (!isEmpty(exists))
            return res.status(400).json({ message: "EMAIL_EXISTS" });
          const cookie_id = md5(Date.now().toString());
          const login = email.replace("@", "_");
          const result = await q<ResultSetHeader>({
            query: `INSERT INTO forum_user
              (login, email, pwd, name, phone, country_id, town, address, company, ipaddress, link, email_extra, change_pass_date, insert_date, timestamp, cookie_id)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '0000-00-00 00:00:00', NOW(), NOW(), ?)`,
            values: [
              login,
              email,
              password,
              name,
              phone,
              country_id,
              town,
              address,
              company,
              clientIp(req),
              link,
              email,
              cookie_id,
            ],
          });
          if (result.affectedRows !== 1) throw new Error("INSERT_FAILED");
          const userId = result.insertId;
          const token = sign(
            {
              id: userId,
              name,
              login,
              email,
              phone,
              country_id,
              town,
              address,
              company,
              link,
            },
            process.env.TOKEN_KEY as string,
            { expiresIn: "360d" }
          );
          const maxAge = 60 * 60 * 24 * 30 * 12;
          setCookie("cookie_auth_id", cookie_id, {
            req,
            res,
            maxAge,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
          });
          setCookie("cookie_login", login, {
            req,
            res,
            maxAge,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
          });
          setCookie("user", JSON.stringify({ id: userId, token }), {
            req,
            res,
            maxAge,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
          });
          SENDMAIL(
            {
              from: `${name}<${email}>`,
              to: email,
              subject: "New registration",
              text: `Welcome, ${name}!`,
            },
            (info: any, error: any) => {
              if (error) console.error(error);
            }
          );
          return res.status(200).json({ result: "ok", token, id: userId });
        }
        // Else admin-create user
        if (admin.role !== "admin")
          return res.status(403).json({ message: "Forbidden" });
        const data = req.body as UserBody;
        const {
          email,
          name,
          phone,
          country_id,
          town,
          address,
          company,
          ip = "",
          link = "",
          password,
          role = "user",
        } = data;
        if (!isValidEmail(email) || !name || !password)
          return res.status(400).json({ message: "Invalid input" });
        const dup = await q<RowDataPacket[]>({
          query: "SELECT id FROM forum_user WHERE email = ?",
          values: [email],
        });
        if (!isEmpty(dup))
          return res.status(400).json({ message: "EMAIL_EXISTS" });
        const insert = await q<ResultSetHeader>({
          query: `INSERT INTO forum_user
            (email, email_extra, login, name, pwd, phone, country_id, town, address, company, ipaddress, link, role, change_pass_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          values: [
            email,
            email,
            email,
            name,
            password,
            phone,
            country_id,
            town,
            address,
            company,
            ip,
            link,
            role,
          ],
        });
        return res.status(201).json({
          id: insert.insertId,
          email,
          name,
          phone,
          country_id,
          town,
          address,
          company,
          ip,
          link,
          role,
        });
      }

      case "PUT": {
        const admin = getUserFromReq(req);
        if (admin.role !== "admin")
          return res.status(403).json({ message: "Forbidden" });
        const {
          id,
          email,
          name,
          phone,
          country_id,
          town,
          address,
          company,
          ip = "",
          link = "",
          password,
        } = req.body as UserBody;
        if (!id || !isValidEmail(email) || !name)
          return res.status(400).json({ message: "Invalid input" });
        const dup = await q<RowDataPacket[]>({
          query: "SELECT id FROM forum_user WHERE email = ? AND id != ?",
          values: [email, id],
        });
        if (!isEmpty(dup))
          return res.status(400).json({ message: "EMAIL_EXISTS" });
        const upd = await q<ResultSetHeader>({
          query: `UPDATE forum_user SET
            email=?, email_extra=?, login=?, name=?, pwd=?, phone=?, country_id=?, town=?, address=?, company=?, ipaddress=?, link=?,  change_pass_date=NOW()
           WHERE id=?`,
          values: [
            email,
            email,
            email,
            name,
            password,
            phone,
            country_id,
            town,
            address,
            company,
            ip,
            link,
            id,
          ],
        });
        if (upd.affectedRows === 0)
          return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "Updated" });
      }

      case "DELETE": {
        const admin = getUserFromReq(req);
        if (admin.role !== "admin")
          return res.status(403).json({ message: "Forbidden" });
        const { id } = req.query as { id?: string };
        if (!id) return res.status(400).json({ message: "ID is required" });
        const del = await q<ResultSetHeader>({
          query: "DELETE FROM forum_user WHERE id = ?",
          values: [Number(id)],
        });
        if (del.affectedRows === 0)
          return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "Deleted" });
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || "Server error";
    return res.status(status).json({ message });
  }
}
