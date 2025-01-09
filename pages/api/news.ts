import { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";
import { NewsItem } from "../../src/context/NewsContext";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface PostBody {
  title: string;
  content: string;
  status: 0 | 1;
}

interface PutBody extends PostBody {
  id: number;
}

interface PatchBody {
  id: number;
  status: 0 | 1;
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (id) {
    const rows = (await q<RowDataPacket[]>({
      query: "SELECT * FROM news WHERE id = ?",
      values: [id],
    })) as NewsItem[];

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "News item not found" });
    }
  } else {
    const rows = (await q<RowDataPacket[]>({
      query: "SELECT * FROM news",
    })) as NewsItem[];
    res.status(200).json(rows);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, status } = req.body as PostBody;

  const result = (await q<ResultSetHeader>({
    query: "INSERT INTO news (title, content, status) VALUES (?, ?, ?)",
    values: [title, content, status],
  })) as ResultSetHeader;

  res.status(201).json({ id: result.insertId, title, content, status });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content, status } = req.body as PutBody;

  await q<ResultSetHeader>({
    query: "UPDATE news SET title = ?, content = ?, status = ? WHERE id = ?",
    values: [title, content, status, id],
  });

  res.status(200).json({ id, title, content, status });
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const { id, status } = req.body as PatchBody;

  await q<ResultSetHeader>({
    query: "UPDATE news SET status = ? WHERE id = ?",
    values: [status, id],
  });

  res.status(200).json({ id, status });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id?: string };

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const result = (await q<ResultSetHeader>({
    query: "DELETE FROM news WHERE id = ?",
    values: [id],
  })) as ResultSetHeader;

  if (result.affectedRows > 0) {
    res.status(200).json({ message: "News item deleted successfully" });
  } else {
    res.status(404).json({ error: "News item not found" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      case "POST":
        await handlePost(req, res);
        break;
      case "PUT":
        await handlePut(req, res);
        break;
      case "PATCH":
        await handlePatch(req, res);
        break;
      case "DELETE":
        await handleDelete(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Database operation failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
