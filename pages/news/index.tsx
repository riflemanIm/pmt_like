// ===== CLIENT-SIDE PAGE =====
// File: /app/news/page.tsx

"use client";
import React, { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";

import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";
import {
  useNewsState,
  NewsItem,
  NewsProvider,
  useNewsStateDispatch,
} from "../../src/context/NewsContext";
import { fetchNews } from "../../src/actions/news";
import { Typography, IconButton, Button } from "@mui/material";

import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Loading from "components/Loading";
import { formatDate } from "../../src/helpers/dates";
import img from "../../assets/images/bg/bg2.jpg";

const Accordion = styled((props: any) => (
  <MuiAccordion elevation={0} square {...props} />
))();

function NewsPage() {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const { news, loading, error } = useNewsState();
  const newsDispatch = useNewsStateDispatch();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  interface HandleChangeProps {
    (panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
  }

  const handleChange: HandleChangeProps = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, []);

  useEffect(() => {
    //
    if (!isAuthenticated) {
      Router.push("/signin");
    }
    if (isAuthenticated) {
      // Загружаем новости при монтировании компонента
      fetchNews(newsDispatch);
    }
  }, [isAuthenticated]);

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
                <>
                  <Typography
                    variant="h5"
                    my={1}
                    sx={{ width: "80%", flexShrink: 0 }}
                  >
                    {item.title}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                    >
                      {item.updated_at
                        ? formatDate(item.updated_at, "DD.MM.YYYY")
                        : "N/A"}
                    </Typography>
                  </Typography>

                  <IconButton
                    component={Link}
                    edge="end"
                    aria-label="Edit"
                    href={`/news/${item.id}`}
                    sx={{ mr: 2 }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    component={Link}
                    edge="end"
                    aria-label="Delete"
                    href={`/news/${item.id}`}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              </AccordionSummary>
              <AccordionDetails>{item.content}</AccordionDetails>
            </Accordion>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href={`/news/add`}
          sx={{ mt: 3 }}
        >
          Добавить новость
        </Button>
      </BaseCard>
    </FullLayout>
  );
}

// Оборачиваем в провайдер
export default function Index() {
  return (
    <NewsProvider>
      <NewsPage />
    </NewsProvider>
  );
}
