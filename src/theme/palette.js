import tinycolor from "tinycolor2";

//const lighterenRate = 1.5;
const lightenRate = 7.5;
const darkenRate = 20;
//const darkerRate = 30;

const primary = "#5f5c93";
const secondary = "#73D7F5";
const warning = "#F57069";
const success = "#34DFA2";
const info = "#abb3ff";
const error = "#f44336";

const palette = {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    error: {
      main: error,
      light: tinycolor(error).lighten(lightenRate).toHexString(),
      dark: tinycolor(error).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
      contrastText: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: tinycolor(secondary).lighten(22).toHexString(),
      active: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fbfbfb42",
    },
  },
};
export default palette;
