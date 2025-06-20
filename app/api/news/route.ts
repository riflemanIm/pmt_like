import { NextRequest, NextResponse } from "next/server";
import { q } from "lib/db";
import { NewsItem } from "context/NewsContext";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import isEmpty from "helpers";
import { JwtPayload, verify } from "jsonwebtoken";

// Helper to convert ISO 8601 string to MySQL DATETIME format
function formatDateTime(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (isNaN(d.getTime())) return undefined;
  // YYYY-MM-DD HH:MM:SS
  return d.toISOString().slice(0, 19).replace("T", " ");
}

interface PostBody {
  title: string;
  content: string;
  status: 0 | 1;
  created_at?: string;
  updated_at?: string;
}
interface PutBody extends PostBody {
  id: number;
}
interface PatchBody {
  id: number;
  status: 0 | 1;
}

async function checkUser(token: string) {
  if (isEmpty(token)) {
    throw NextResponse.json(
      { message: "A token is required for authentication" },
      { status: 401 }
    );
  }
  try {
    const decoded = verify(token, process.env.TOKEN_KEY as string);
    if (!decoded || isEmpty(decoded)) {
      throw NextResponse.json(
        { message: "Check token has failed" },
        { status: 401 }
      );
    }
    if (typeof decoded !== "string") {
      return decoded as JwtPayload;
    }
    throw NextResponse.json(
      { message: "Invalid token payload" },
      { status: 401 }
    );
  } catch (err: any) {
    throw NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  const token = searchParams.get("token") || "";

  if (id) {
    const rows = (await q<RowDataPacket[]>({
      query: "SELECT * FROM news WHERE id = ?",
      values: [id],
    })) as RowDataPacket[];

    if (rows.length > 0) {
      return NextResponse.json(rows[0] as unknown as NewsItem);
    }
    return NextResponse.json(
      { message: "News item not found" },
      { status: 404 }
    );
  }

  const user = await checkUser(token);
  const sql =
    user.role === "admin"
      ? "SELECT * FROM news"
      : "SELECT * FROM news WHERE status = '1'";
  const rows = (await q<RowDataPacket[]>({ query: sql })) as RowDataPacket[];
  return NextResponse.json(rows as unknown as NewsItem[]);
}

export async function POST(request: NextRequest) {
  const body: PostBody = await request.json();
  const { title, content, status, created_at, updated_at } = body;

  // Prepare insert data
  const cols = ["title", "content", "status"];
  const vals: any[] = [title, content, status];
  const placeholders = ["?", "?", "?"];

  const formattedCreated = formatDateTime(created_at);
  const formattedUpdated = formatDateTime(updated_at);
  if (formattedCreated) {
    cols.push("created_at");
    placeholders.push("?");
    vals.push(formattedCreated);
  }
  if (formattedUpdated) {
    cols.push("updated_at");
    placeholders.push("?");
    vals.push(formattedUpdated);
  }

  const insertSql = `INSERT INTO news (${cols.join(
    ", "
  )}) VALUES (${placeholders.join(", ")})`;
  const result = (await q<ResultSetHeader>({
    query: insertSql,
    values: vals,
  })) as ResultSetHeader;

  const rows = (await q<RowDataPacket[]>({
    query: "SELECT * FROM news WHERE id = ?",
    values: [result.insertId],
  })) as RowDataPacket[];
  return NextResponse.json(rows[0] as unknown as NewsItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body: PutBody = await request.json();
  const { id, title, content, status, created_at, updated_at } = body;

  // Prepare update data
  const sets = ["title = ?", "content = ?", "status = ?"];
  const vals: any[] = [title, content, status];

  const formattedCreated = formatDateTime(created_at);
  const formattedUpdated = formatDateTime(updated_at);
  if (formattedCreated) {
    sets.push("created_at = ?");
    vals.push(formattedCreated);
  }
  if (formattedUpdated) {
    sets.push("updated_at = ?");
    vals.push(formattedUpdated);
  }

  const updateSql = `UPDATE news SET ${sets.join(", ")} WHERE id = ?`;
  vals.push(id);
  await q<ResultSetHeader>({ query: updateSql, values: vals });

  const rows = (await q<RowDataPacket[]>({
    query: "SELECT * FROM news WHERE id = ?",
    values: [id],
  })) as RowDataPacket[];
  return NextResponse.json(rows[0] as unknown as NewsItem);
}

export async function PATCH(request: NextRequest) {
  const { id, status }: PatchBody = await request.json();
  await q<ResultSetHeader>({
    query: "UPDATE news SET status = ? WHERE id = ?",
    values: [status, id],
  });

  const rows = (await q<RowDataPacket[]>({
    query: "SELECT * FROM news WHERE id = ?",
    values: [id],
  })) as RowDataPacket[];
  return NextResponse.json(rows[0] as unknown as NewsItem);
}

export async function DELETE(request: NextRequest) {
  const { id } = Object.fromEntries(request.nextUrl.searchParams) as {
    id?: string;
  };
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const result = (await q<ResultSetHeader>({
    query: "DELETE FROM news WHERE id = ?",
    values: [id],
  })) as ResultSetHeader;
  if (result.affectedRows > 0) {
    return NextResponse.json({ message: "News item deleted successfully" });
  }
  return NextResponse.json({ error: "News item not found" }, { status: 404 });
}
