// ===== CLIENT-SIDE PAGE FOR SINGLE NEWS =====
// File: /app/news/[id]/page.js

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, Typography, Button, TextField, Box } from "@mui/material";

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [newsItem, setNewsItem] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`/api/news`, { params: { id } });
        setNewsItem(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put("/api/news", {
        id,
        title: newsItem.title,
        content: newsItem.content,
      });
      router.push("/news");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/news`, { params: { id } });
      router.push("/news");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Typography>Loading news...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!newsItem.title && !newsItem.content)
    return <Typography>No news item found.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit News
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          label="Title"
          value={newsItem.title}
          onChange={(e) => setNewsItem({ ...newsItem, title: e.target.value })}
          fullWidth
        />
        <TextField
          label="Content"
          value={newsItem.content}
          onChange={(e) =>
            setNewsItem({ ...newsItem, content: e.target.value })
          }
          fullWidth
          multiline
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update News
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete News
        </Button>
      </Box>
    </Container>
  );
}

// ===== MOCK DATA FILE REMOVED =====
// The news data is now stored in the MySQL database.
