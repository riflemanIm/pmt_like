// /app/news/page.tsx — SSR-компонент (без use client)

import React from "react";
import { NewsProvider } from "../../src/context/NewsContext";
import NewsPageClient from "./NewsPageClient"; // новый файл, см. ниже

export default function NewsPage() {
  return (
    <NewsProvider>
      <NewsPageClient />
    </NewsProvider>
  );
}
