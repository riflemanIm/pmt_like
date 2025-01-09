import React, { useEffect, useState } from "react";
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
import { updateNewsItem } from "../../src/actions/news";
import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";
import { useNewsStateDispatch } from "../../src/context/NewsContext";
import img from "../../assets/images/bg/bg2.jpg";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const AddNewsPage: React.FC = () => {
  const router = useRouter();
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const newsDispatch = useNewsStateDispatch();

  const [newNewsItem, setNewNewsItem] = useState<{
    title: string;
    content: string;
    status: 0 | 1;
    created_at: string;
    updated_at: string;
  }>({
    title: "",
    content: "",
    status: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, [user.token, userDispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  const handleAdd = async () => {
    try {
      await updateNewsItem(newsDispatch, newNewsItem);
      setNewNewsItem({
        title: "",
        content: "",
        status: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setNewNewsItem({ ...newNewsItem, content: text });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNewsItem({ ...newNewsItem, status: event.target.checked ? 1 : 0 });
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Add News
      </Typography>
      <BaseCard>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="Title"
            value={newNewsItem.title}
            onChange={(e) =>
              setNewNewsItem({ ...newNewsItem, title: e.target.value })
            }
            fullWidth
          />
          <MdEditor
            value={newNewsItem.content}
            style={{ height: "500px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={handleEditorChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newNewsItem.status === 1}
                onChange={handleStatusChange}
                color="primary"
              />
            }
            label="Status"
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add News
          </Button>
        </Box>
      </BaseCard>
    </FullLayout>
  );
};

export default AddNewsPage;
