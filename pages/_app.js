import * as React from "react";

//import PropTypes from "prop-types";
//import App from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "../src/context/UserContext";

import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
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
        <title>Пост Модерн Текнолоджи </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
      {/* <Script src="/static/bot.js"></Script> */}
    </CacheProvider>
  );
};

export default MyApp;
