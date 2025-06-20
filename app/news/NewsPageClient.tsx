// app/news/page.tsx
"use client";

import React, { useEffect, useState, Dispatch } from "react";
import { useRouter } from "next/navigation";
import FullLayout from "layouts/FullLayout";
import BaseCard from "components/baseCard/BaseCard";
import { useUserStateDispatch } from "context/UserContext";
import { checkAuth } from "actions/user";
import {
  useNewsState,
  NewsItem,
  useNewsStateDispatch,
} from "context/NewsContext";
import { fetchNews, updateNewsItemStatus } from "actions/news";
import {
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ReactMarkdown from "react-markdown";
import Loading from "components/Loading";
import img from "../../assets/images/bg/bg2.jpg";

type Action = { type: string; payload?: any };

const Accordion = styled((props: any) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function NewsPageClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // App state and dispatches
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const newsDispatch = useNewsStateDispatch();
  const { news, loading, error } = useNewsState();
  const [expanded, setExpanded] = useState<string | false>(false);

  // Run on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Authentication check
  useEffect(() => {
    if (mounted) {
      checkAuth(userDispatch as Dispatch<Action>, user.token ?? "");
    }
  }, [mounted, user.token, userDispatch]);

  // Fetch news or redirect
  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        router.push("/signin");
      } else {
        fetchNews(newsDispatch, user.token);
      }
    }
  }, [mounted, isAuthenticated, newsDispatch, router, user.token]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedStatus = event.target.checked ? 1 : 0;
    try {
      updateNewsItemStatus(id, updatedStatus, newsDispatch);
      newsDispatch({
        type: "UPDATE_NEWS_STATUS",
        payload: { id, status: updatedStatus },
      });
    } catch (err) {
      newsDispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };

  if (!mounted) {
    // Avoid hydration mismatch by waiting for client mount
    return null;
  }

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Личный кабинет
      </Typography>
      <BaseCard>
        <Typography variant="h3">Новости</Typography>

        {loading && <Loading />}
        {error && <Typography color="error">Error: {error}</Typography>}

        {news.map((item: NewsItem, inx: number) => (
          <div key={item.id} style={{ marginTop: 48 }}>
            <Accordion
              expanded={expanded === `panel${inx}`}
              onChange={handleChange(`panel${inx}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${inx}-content`}
                id={`panel${inx}-header`}
              >
                <Typography variant="h5" my={1} sx={{ width: "60%" }}>
                  {item.title}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                  >
                    {item.updated_at
                      ? item.updated_at
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join(".")
                      : ""}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {user.role === "admin" && (
                  <Box textAlign="right">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={item.status === 1}
                          onChange={(e) =>
                            item.id != null && handleStatusChange(e, item.id)
                          }
                          color="primary"
                        />
                      }
                      label="Status"
                    />
                    <IconButton
                      onClick={() => router.push(`/news/${item.id}`)}
                      sx={{ mr: 2 }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Box>
                )}
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        {user.role === "admin" && (
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => router.push("/news/add")}
          >
            Добавить новость
          </Button>
        )}
      </BaseCard>
    </FullLayout>
  );
}
