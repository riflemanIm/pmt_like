// ===== SERVER-SIDE API =====
// File: /pages/api/news.js

import { q } from "../../src/lib/db";

export default async function handler(req, res) {
  try {
    const connection = await q();

    if (req.method === "GET") {
      const { id } = req.query;
      if (id) {
        const [rows] = await connection.execute(
          "SELECT * FROM news WHERE id = ?",
          [id]
        );
        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: "News item not found" });
        }
      } else {
        const [rows] = await connection.execute("SELECT * FROM news");
        res.status(200).json(rows);
      }
    } else if (req.method === "POST") {
      const { title, content } = req.body;
      await connection.execute(
        "INSERT INTO news (title, content) VALUES (?, ?)",
        [title, content]
      );
      res.status(201).json({ message: "News item created successfully" });
    } else if (req.method === "PUT") {
      const { id, title, content } = req.body;
      await connection.execute(
        "UPDATE news SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
      );
      res.status(200).json({ message: "News item updated successfully" });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await connection.execute("DELETE FROM news WHERE id = ?", [id]);
      res.status(200).json({ message: "News item deleted successfully" });
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await connection.end();
  } catch (error) {
    res.status(500).json({ error: "Database operation failed" });
  }
}
