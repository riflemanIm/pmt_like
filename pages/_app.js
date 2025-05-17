import * as React from "react";
import { CacheProvider } from "@emotion/react";
import { UserProvider } from "../src/context/UserContext";
// 1) JSS-ThemeProvider (для makeStyles)
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
// 2) Emotion ThemeProvider (для sx, styled и т.п.)
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Head from "next/head";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/style.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

//Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Пост Модерн Текнолоджи</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Remove all security-related meta tags, they should be in next.config.js */}
      </Head>
      // 1) сначала JSS-провайдер, чтобы makeStyles нашёл theme.spacing
      <StylesThemeProvider theme={theme}>
        {/* 2) потом MUI ThemeProvider, чтобы sx/styled тоже увидели эту же тему */}
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </MuiThemeProvider>
      </StylesThemeProvider>
      {/* <Script src="/static/bot.js"></Script> */}
    </CacheProvider>
  );
};

export default MyApp;
