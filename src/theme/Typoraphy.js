// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

// function responsiveFontSizes({ sm, md, lg }) {
//   return {
//     '@media (min-width:600px)': {
//       fontSize: pxToRem(sm),
//     },
//     '@media (min-width:900px)': {
//       fontSize: pxToRem(md),
//     },
//     '@media (min-width:1200px)': {
//       fontSize: pxToRem(lg),
//     },
//   };
// }

const FONT_PRIMARY = "Avenir Next Cyr";

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: "2.8rem",
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
  },
  h2: {
    fontSize: "1.7rem",
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
  },
  h3: {
    fontSize: "1.64rem",
    fontWeight: 500,
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
  },
  h4: {
    fontSize: "1.5rem",
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
  },
  h5: {
    fontSize: "1.285rem",
    textShadow: "3px 2px 3px rgba(255,255,255,.2)",
  },
  h6: {
    fontSize: "1.05rem",
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
