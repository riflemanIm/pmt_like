import { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";
import { NewsItem } from "../../src/context/NewsContext";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface PostBody {
  title: string;
  content: string;
}

interface PutBody extends PostBody {
  id: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (id) {
        const rows = (await q<RowDataPacket[]>({
          query: "SELECT * FROM news WHERE id = ?",
          values: [id],
        })) as NewsItem[];

        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: "News item not found" });
        }
      } else {
        const rows = (await q<RowDataPacket[]>({
          query: "SELECT * FROM news",
        })) as NewsItem[];

        res.status(200).json(rows);
      }
    } else if (req.method === "POST") {
      const { title, content } = req.body as PostBody;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      await q<ResultSetHeader>({
        query: "INSERT INTO news (title, content) VALUES (?, ?)",
        values: [title, content],
      });

      res.status(201).json({ message: "News item created successfully" });
    } else if (req.method === "PUT") {
      const { id, title, content } = req.body as PutBody;

      if (!id || !title || !content) {
        return res
          .status(400)
          .json({ error: "ID, title, and content are required" });
      }

      const result = (await q<ResultSetHeader>({
        query: "UPDATE news SET title = ?, content = ? WHERE id = ?",
        values: [title, content, id],
      })) as ResultSetHeader;

      if (result.affectedRows > 0) {
        res.status(200).json({ message: "News item updated successfully" });
      } else {
        res.status(404).json({ error: "News item not found" });
      }
    } else if (req.method === "DELETE") {
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
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Database operation failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
