// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = "Avenir Next Cyr";

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({
      sm: 52,
      md: 58,
      lg: 64,
    }),
  },
  h2: {
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
    lineHeight: 64 / 48,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({
      sm: 40,
      md: 44,
      lg: 48,
    }),
  },
  h3: {
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
    lineHeight: 1.2,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({
      sm: 26,
      md: 30,
      lg: 32,
    }),
  },
  h4: {
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
    lineHeight: 1.2,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({
      sm: 20,
      md: 24,
      lg: 24,
    }),
  },
  h5: {
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
    lineHeight: 1.2,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({
      sm: 19,
      md: 20,
      lg: 20,
    }),
  },
  h6: {
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({
      sm: 18,
      md: 18,
      lg: 18,
    }),
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
  },
  subtitle2: {
    fontWeight: 450,
    lineHeight: 22 / 14,
    fontSize: pxToRem(18),
  },
  body1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(16),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 500,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    //    textTransform: 'capitalize',
  },
};

export default typography;
