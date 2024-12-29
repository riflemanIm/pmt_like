// ===== CLIENT-SIDE PAGE =====
// File: /app/news/page.js

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function NewsPage() {
  const [state, setState] = useState({
    news: [],
    newTitle: "",
    newContent: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setState((prevState) => ({
          ...prevState,
          news: response.data,
          loading: false,
        }));
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          error: err.message,
          loading: false,
        }));
      }
    };

    fetchNews();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post("/api/news", {
        title: state.newTitle,
        content: state.newContent,
      });
      const response = await axios.get("/api/news");
      setState((prevState) => ({
        ...prevState,
        news: response.data,
        newTitle: "",
        newContent: "",
      }));
    } catch (err) {
      setState((prevState) => ({ ...prevState, error: err.message }));
    }
  };

  if (state.loading) return <Typography>Loading news...</Typography>;
  if (state.error)
    return <Typography color="error">Error: {state.error}</Typography>;

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        News
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          label="Title"
          value={state.newTitle}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              newTitle: e.target.value,
            }))
          }
          fullWidth
        />
        <TextField
          label="Content"
          value={state.newContent}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              newContent: e.target.value,
            }))
          }
          fullWidth
          multiline
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create News
        </Button>
      </Box>
      <List>
        {state.news.map((item) => (
          <ListItem
            key={item.id}
            component={Link}
            href={`/news/${item.id}`}
            button
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
