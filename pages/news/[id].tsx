import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Box, TextField, Button } from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import {
  fetchNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from "../../src/actions/news";
import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";
import {
  NewsProvider,
  useNewsState,
  useNewsStateDispatch,
} from "../../src/context/NewsContext";
import img from "../../assets/images/bg/bg2.jpg";

const NewsItem: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const { newsItem, loading, error } = useNewsState();
  const newsDispatch = useNewsStateDispatch();

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, [user.token]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      const newsId = Number(id);
      if (!isNaN(newsId)) {
        fetchNewsItem(newsId, newsDispatch);
      } else {
        newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
      }
    }
  }, [isAuthenticated, id]);

  const handleUpdate = async () => {
    try {
      const newsId = Number(id);
      if (!isNaN(newsId) && newsItem) {
        await updateNewsItem(newsId, newsItem, newsDispatch);
      } else {
        newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
      }
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  const handleDelete = async () => {
    try {
      const newsId = Number(id);
      if (!isNaN(newsId)) {
        const r = await deleteNewsItem(newsId, newsDispatch);
        if (r) router.push("/news");
      } else {
        newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
      }
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  if (loading) return <Typography>Loading news...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!newsItem?.title && !newsItem?.content)
    return <Typography>No news item found.</Typography>;

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        {id ? "Edit News" : "Add News"}
      </Typography>
      <BaseCard>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="Title"
            value={newsItem.title}
            onChange={(e) =>
              newsDispatch({
                type: "SET_NEWS_ITEM",
                payload: { ...newsItem, title: e.target.value },
              })
            }
            fullWidth
          />
          <TextField
            label="Content"
            value={newsItem.content}
            onChange={(e) =>
              newsDispatch({
                type: "SET_NEWS_ITEM",
                payload: { ...newsItem, content: e.target.value },
              })
            }
            fullWidth
            multiline
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mb: 3 }}
          >
            Сохранить
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ mb: 3 }}
          >
            Удалить
          </Button>

          <Button
            variant="text"
            color="primary"
            onClick={() => {
              router.push("/news");
            }}
          >
            Вернуться
          </Button>
        </Box>
      </BaseCard>
    </FullLayout>
  );
};

// Оборачиваем в провайдер
export default function NewsItemPage() {
  return (
    <NewsProvider>
      <NewsItem />
    </NewsProvider>
  );
}
