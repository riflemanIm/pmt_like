import * as React from "react";
// 1) JSS-ThemeProvider (для makeStyles)
// 2) Emotion ThemeProvider (для sx, styled и т.п.)

import "../styles/style.css";
import Providers from "./Providers";

export const metadata = {
  title: "Пост Модерн Текнолоджи",
  description:
    "Разработчиков медицинских информационных систем (МИС) на территории РФ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you need to hydrate emotion on the server, you can also set up a CacheProvider
  // with emotion’s SSR APIs here—but at minimum you need the client-side cache:
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
