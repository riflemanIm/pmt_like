// app/news/[id]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import FullLayout from "layouts/FullLayout";
import BaseCard from "components/baseCard/BaseCard";
import { fetchNewsItem, updateNewsItem, deleteNewsItem } from "actions/news";
import { useUserStateDispatch } from "context/UserContext";
import { checkAuth } from "actions/user";
import {
  NewsProvider,
  useNewsState,
  useNewsStateDispatch,
} from "context/NewsContext";
import img from "../../../assets/images/bg/bg2.jpg";
import Loading from "components/Loading";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

function NewsItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const { newsItem, loading, error } = useNewsState();
  const newsDispatch = useNewsStateDispatch();

  useEffect(() => {
    if (user?.token) checkAuth(userDispatch, user.token);
  }, [user?.token, userDispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else if (!isNaN(id)) {
      fetchNewsItem(id, newsDispatch);
    } else {
      newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
    }
  }, [isAuthenticated, id, router, newsDispatch]);

  const handleUpdate = async () => {
    try {
      if (!isNaN(id) && newsItem) {
        await updateNewsItem(newsDispatch, newsItem);
      } else {
        newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
      }
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  const handleDelete = async () => {
    try {
      if (!isNaN(id)) {
        const success = await deleteNewsItem(id, newsDispatch);
        if (success) router.push("/news");
      } else {
        newsDispatch({ type: "SET_ERROR", payload: "Invalid news ID" });
      }
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    if (newsItem)
      newsDispatch({
        type: "SET_NEWS_ITEM",
        payload: { ...newsItem, content: text },
      });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newsItem) {
      newsDispatch({
        type: "SET_NEWS_ITEM",
        payload: {
          ...newsItem,
          status: e.target.checked ? 1 : 0,
        },
      });
    }
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={4}>
        Редакция новости
      </Typography>
      <BaseCard>
        {loading && <Loading />}
        {error && <Typography color="error">Error: {error}</Typography>}

        {!loading && (
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            <TextField
              label="Заголовок"
              value={newsItem?.title || ""}
              onChange={(e) =>
                newsItem &&
                newsDispatch({
                  type: "SET_NEWS_ITEM",
                  payload: { ...newsItem, title: e.target.value },
                })
              }
              fullWidth
            />
            <MdEditor
              value={newsItem?.content || ""}
              style={{ height: "400px" }}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              onChange={handleEditorChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newsItem?.status === 1}
                  onChange={handleStatusChange}
                />
              }
              label="Опубликовано"
            />
            <Button variant="contained" onClick={handleUpdate} sx={{ mb: 2 }}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ mb: 2 }}
            >
              Удалить
            </Button>
            <Button variant="text" onClick={() => router.push("/news")}>
              К новостям
            </Button>
          </Box>
        )}
      </BaseCard>
    </FullLayout>
  );
}

export default function PageWrapper() {
  return (
    <NewsProvider>
      <NewsItemPage />
    </NewsProvider>
  );
}
