import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
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
import Loading from "components/Loading";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

function NewsItemComp() {
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

  const handleEditorChange = ({ text }: { text: string }) => {
    if (newsItem)
      newsDispatch({
        type: "SET_NEWS_ITEM",
        payload: { ...newsItem, content: text },
      });
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (newsItem) {
      const updatedNewsItem = {
        ...newsItem,
        status: event.target.checked ? (1 as 1) : (0 as 0),
        title: newsItem.title || "",
        content: newsItem.content || "",
      };
      newsDispatch({ type: "SET_NEWS_ITEM", payload: updatedNewsItem });
    }
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Edit News
      </Typography>
      <BaseCard>
        {loading && <Loading />}
        {error && <Typography color="error">Error: {error}</Typography>}

        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="Title"
            value={newsItem ? newsItem.title : ""}
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
            value={newsItem ? newsItem.content : ""}
            style={{ height: "500px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={handleEditorChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newsItem ? newsItem.status === 1 : false}
                onChange={handleStatusChange}
                color="primary"
              />
            }
            label="Status"
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
}

// Оборачиваем в провайдер
export default function NewsItemPage() {
  return (
    <NewsProvider>
      <NewsItemComp />
    </NewsProvider>
  );
}
