import { CacheProvider } from "@emotion/react";
import { UserProvider } from "../src/context/UserContext";
// 1) JSS-ThemeProvider (для makeStyles)
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
// 2) Emotion ThemeProvider (для sx, styled и т.п.)
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import createCache from "@emotion/cache";
import Head from "next/head";
import theme from "../src/theme/theme";
import "../styles/style.css";

//Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({
  key: "css",
  prepend: true,
});

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>Пост Модерн Текнолоджи</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <StylesThemeProvider theme={theme}>
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
