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
  useNewsStateDispatch,
  NewsItem,
  NewsProvider,
} from "../../src/context/NewsContext";
import { fetchNews } from "../../src/actions/news";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import img from "../../assets/images/bg/bg2.jpg";

function NewsPage() {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const { newsState, newsDispatch } = useNewsStateDispatch();

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
  if (newsState.loading) {
    return <Typography>Loading news...</Typography>;
  }

  if (newsState.error) {
    return <Typography color="error">Error: {newsState.error}</Typography>;
  }

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Личный кабинет
      </Typography>
      <BaseCard>
        <List>
          {newsState.news.map((item: NewsItem) => (
            <ListItem key={item.id} component={Link} href={`/news/${item.id}`}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
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
