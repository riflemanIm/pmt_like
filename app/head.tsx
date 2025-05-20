// app/head.tsx
import theme from "../src/theme/theme";

export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />

      {/* PWA primary color */}
      <meta name="theme-color" content={theme.palette.primary.main} />

      {/* Remove all security headers from meta tags - these should be set in next.config.js */}

      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/favicon/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color={theme.palette.primary.main}
      />
    </>
  );
}
