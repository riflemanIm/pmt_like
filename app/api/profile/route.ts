import { NextRequest, NextResponse } from "next/server";
import { q } from "lib/db";
import isEmpty from "helpers";
import { isValidEmail } from "validation/validators";
import SENDMAIL from "helpers/mail";
import md5 from "md5";
import { sign, verify } from "jsonwebtoken";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface UserRecord extends RowDataPacket {
  id: number;
  role: "admin" | "user";
}

interface UserBody {
  id?: number;
  email: string;
  name: string;
  phone: string;
  country_id: number;
  town: string;
  address: string;
  company: string;
  ip: string;
  link?: string;
  password: string;
  role?: "admin" | "user";
}

interface SignupRequest extends Omit<UserBody, "role"> {}

// Helper: extract user from JWT in Authorization header
function getUserFromReq(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    throw new NextResponse("Missing token", { status: 401 });
  }
  const token = auth.slice(7);
  try {
    const decoded = verify(token, process.env.TOKEN_KEY as string);
    if (typeof decoded === "string" || isEmpty(decoded)) {
      throw new Error();
    }
    return decoded as UserRecord;
  } catch {
    throw new NextResponse("Invalid or expired token", { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const rows = await q<RowDataPacket[]>({
      query: "SELECT * FROM forum_user WHERE id = ?",
      values: [Number(id)],
    });
    if (rows.length === 0)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  }
  // list all (admin only)
  const user = getUserFromReq(req);
  if (user.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const all = await q<RowDataPacket[]>({ query: "SELECT * FROM forum_user" });
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  let admin: UserRecord | null = null;
  if (auth?.startsWith("Bearer ")) {
    admin = getUserFromReq(req);
  }
  console.log("admin.role", admin);
  // signup flow
  if (!admin) {
    const body = (await req.json()) as SignupRequest;
    const {
      email,
      password,
      name,
      phone,
      country_id,
      town,
      address,
      company,
      ip,
      link = "",
    } = body;
    if (!isValidEmail(email))
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    const exists = await q<RowDataPacket[]>({
      query: "SELECT id FROM forum_user WHERE email = ? LIMIT 1",
      values: [email],
    });
    if (!isEmpty(exists))
      return NextResponse.json({ message: "EMAIL_EXISTS" }, { status: 400 });
    const cookie_id = md5(Date.now().toString());
    const login = email.replace("@", "_");
    const result = await q<ResultSetHeader>({
      query: `INSERT INTO forum_user
        (login,email,pwd,name,phone,country_id,town,address,company,ipaddress,link,email_extra,change_pass_date,insert_date,timestamp,cookie_id)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),NOW(),?)`,
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
        ip,
        link,
        email,
        cookie_id,
      ],
    });
    if (result.affectedRows !== 1)
      return NextResponse.json({ message: "INSERT_FAILED" }, { status: 500 });
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
    const res = NextResponse.json({ result: "ok", token, id: userId });
    const maxAge = 60 * 60 * 24 * 30 * 12;
    res.cookies.set("cookie_auth_id", cookie_id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    res.cookies.set("cookie_login", login, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    SENDMAIL(
      {
        from: `${name}<${email}>`,
        to: email,
        subject: "New registration",
        text: `Welcome, ${name}!`,
      },
      () => {}
    );
    return NextResponse.json(
      { message: "ok", token, id: userId },
      { status: 201 }
    );
  }
  // admin-create
  if (admin.role === "admin") {
    const data = (await req.json()) as UserBody;
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
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    const dup = await q<RowDataPacket[]>({
      query: "SELECT id FROM forum_user WHERE email = ?",
      values: [email],
    });
    if (!isEmpty(dup))
      return NextResponse.json({ message: "EMAIL_EXISTS" }, { status: 400 });
    const insert = await q<ResultSetHeader>({
      query: `INSERT INTO forum_user
        (email,email_extra,login,name,pwd,phone,country_id,town,address,company,ipaddress,link,role,change_pass_date)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
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
    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );
  }
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

export async function PUT(req: NextRequest) {
  // const admin = getUserFromReq(req);
  // if (admin.role !== "admin")
  //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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
  } = (await req.json()) as UserBody;
  if (!id || !isValidEmail(email) || !name)
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  const dup = await q<RowDataPacket[]>({
    query: "SELECT id FROM forum_user WHERE email = ? AND id != ?",
    values: [email, id],
  });
  if (!isEmpty(dup))
    return NextResponse.json({ message: "EMAIL_EXISTS" }, { status: 400 });
  const upd = await q<ResultSetHeader>({
    query: `UPDATE forum_user SET email=?,email_extra=?,login=?,name=?,pwd=?,phone=?,country_id=?,town=?,address=?,company=?,ipaddress=?,link=?,change_pass_date=NOW() WHERE id=?`,
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
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req: NextRequest) {
  const admin = getUserFromReq(req);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const del = await q<ResultSetHeader>({
    query: "DELETE FROM forum_user WHERE id = ?",
    values: [Number(id)],
  });
  if (del.affectedRows === 0)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
