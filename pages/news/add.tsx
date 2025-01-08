import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box, TextField, Button } from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { updateNewsItem } from "../../src/actions/news";
import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";
import {
  NewsProvider,
  useNewsState,
  useNewsStateDispatch,
} from "../../src/context/NewsContext";
import img from "../../assets/images/bg/bg2.jpg";
import Loading from "components/Loading";

const NewsItemAdd: React.FC = () => {
  const router = useRouter();

  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const { newsItem, loading, error } = useNewsState();
  const newsDispatch = useNewsStateDispatch();
  const [newNewsItem, setNewNewsItem] = useState({ title: "", content: "" });

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, [user.token]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated]);

  const handleAdd = async () => {
    try {
      await updateNewsItem(newsDispatch, newNewsItem);
      setNewNewsItem({ title: "", content: "" });
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Add News
      </Typography>
      <BaseCard>
        {loading && <Loading />}
        {error && <Typography color="error">Error: {error}</Typography>}

        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="Title"
            value={newNewsItem.title}
            onChange={(e) =>
              setNewNewsItem({ ...newNewsItem, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Content"
            value={newNewsItem.content}
            onChange={(e) =>
              setNewNewsItem({ ...newNewsItem, content: e.target.value })
            }
            fullWidth
            multiline
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add News
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
      <NewsItemAdd />
    </NewsProvider>
  );
}
