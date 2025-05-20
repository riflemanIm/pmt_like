"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";
import { UserProvider } from "../src/context/UserContext";
import theme from "../src/theme/theme";

// 1) JSS-ThemeProvider (для makeStyles)
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
// 2) Emotion ThemeProvider (для sx, styled и т.п.)
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

//Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({
  key: "css",
  prepend: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <StylesThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>{children}</UserProvider>
        </MuiThemeProvider>
      </StylesThemeProvider>
      {/* <Script src="/static/bot.js"></Script> */}
    </CacheProvider>
  );
}
