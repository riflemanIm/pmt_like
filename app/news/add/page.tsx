// app/news/add/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { updateNewsItem } from "actions/news";
import { useUserStateDispatch } from "context/UserContext";
import { checkAuth } from "actions/user";
import { NewsProvider, useNewsStateDispatch } from "context/NewsContext";
import img from "../../../assets/images/bg/bg2.jpg";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

function AddNews() {
  const router = useRouter();
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const newsDispatch = useNewsStateDispatch();

  const [newsItem, setNewsItem] = useState<{
    title: string;
    content: string;
    status: 0 | 1;
  }>({
    title: "",
    content: "",
    status: 0,
  });

  useEffect(() => {
    if (user?.token) checkAuth(userDispatch, user.token);
  }, [user?.token, userDispatch]);

  useEffect(() => {
    if (!isAuthenticated) router.push("/signin");
  }, [isAuthenticated, router]);

  const handleAdd = async () => {
    try {
      await updateNewsItem(newsDispatch, newsItem);
      setNewsItem({ title: "", content: "", status: 0 });
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setNewsItem((prev) => ({ ...prev, content: text }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsItem((prev) => ({ ...prev, status: e.target.checked ? 1 : 0 }));
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={4}>
        Добавить новость
      </Typography>
      <BaseCard>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Заголовок"
            value={newsItem.title}
            onChange={(e) =>
              setNewsItem((prev) => ({ ...prev, title: e.target.value }))
            }
            fullWidth
          />
          <MdEditor
            value={newsItem.content}
            style={{ height: "400px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={handleEditorChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newsItem.status === 1}
                onChange={handleStatusChange}
              />
            }
            label="Опубликовано"
          />
          <Button variant="contained" onClick={handleAdd}>
            Добавить новость
          </Button>
          <Button variant="text" onClick={() => router.push("/news")}>
            к новостям
          </Button>
        </Box>
      </BaseCard>
    </FullLayout>
  );
}

export default function AddNewsPage() {
  return (
    <NewsProvider>
      <AddNews />
    </NewsProvider>
  );
}
