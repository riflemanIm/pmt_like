// next.config.js
const withTM = require("next-transpile-modules")([
  "@mui/x-data-grid",
  "react-pdf",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  // Больше никаких кастомных CSS webpack-правил здесь!
});
