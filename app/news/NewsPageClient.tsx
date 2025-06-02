// /app/news/NewsPageClient.tsx

"use client";

import React, { useEffect, useState, Dispatch } from "react";
import Router from "next/router";
import Link from "next/link";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";

import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";
import {
  useNewsState,
  NewsItem,
  useNewsStateDispatch,
} from "../../src/context/NewsContext";
import { fetchNews, updateNewsItemStatus } from "../../src/actions/news";
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
import { formatDate } from "../../src/helpers/dates";
import img from "../../assets/images/bg/bg2.jpg";

type Action = { type: string; payload?: any };

const Accordion = styled((props: any) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function NewsPageClient() {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const newsDispatch = useNewsStateDispatch();
  const { news, loading, error } = useNewsState();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    checkAuth(userDispatch as Dispatch<Action>, user.token ?? "");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/signin");
    } else {
      fetchNews(newsDispatch, user.token);
    }
  }, [isAuthenticated]);

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
          <div style={{ marginTop: 48 }} key={item.id}>
            <Accordion
              expanded={expanded === `panel${inx}`}
              onChange={handleChange(`panel${inx}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h5" my={1} sx={{ width: "60%" }}>
                  {item.title}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                  >
                    {item.updated_at
                      ? formatDate(item.updated_at, "DD.MM.YYYY")
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
                          value={item.status === 1}
                          checked={item.status === 1}
                          onChange={(e) =>
                            item.id !== undefined &&
                            handleStatusChange(e, item.id)
                          }
                          color="primary"
                        />
                      }
                      label="Status"
                    />
                    <IconButton
                      component={Link}
                      edge="end"
                      aria-label="Edit"
                      href={`/news/${item.id}`}
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
            color="primary"
            component={Link}
            href={`/news/add`}
            sx={{ mt: 3 }}
          >
            Добавить новость
          </Button>
        )}
      </BaseCard>
    </FullLayout>
  );
}
