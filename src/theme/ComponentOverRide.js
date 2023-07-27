import rawPalette from "./palette";

const { palette } = rawPalette;
//console.log("palette---------------------", palette);
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
      },
      "#root": {
        height: "100%",
      },
      "*[dir='rtl'] .buyNowImg": {
        transform: "scaleX(-1)",
      },

      ".buyNowImg": {
        position: "absolute",
        right: "-44px",
        top: "-18px",
        width: "143px",
        height: "175px",
      },
      ".MuiCardHeader-action": {
        alignSelf: "center !important",
      },
      ".scrollbar-container": {
        borderRight: "0 !important",
      },
      "*[dir='rtl'] .welcomebg:before": {
        backgroundPosition: "top -24px left -9px !important",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "15px !important",
        paddingRight: "15px !important",
        maxWidth: "1600px",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none",

        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: "9px",

        color: palette.primary.dark,
        "& .MuiListItemIcon-root": {
          color: palette.primary.dark,
        },
        "&:hover,&:focus, &.active": {
          color: palette.text.primary,
          background: palette.action.hover,

          "& .MuiListItemIcon-root": {
            color: palette.text.primary,
            fill: palette.text.primary,
          },
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        padding: "14px",
        backgroundColor: "#fdfdfdd9",
        backdropFilter: "saturate(180%) blur(5px)",
        boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        backgroundColor: "#fdfdfdd9",
        backdropFilter: "saturate(180%) blur(5px)",
        marginBottom: 34,
        //border: `1px solid ${theme.palette.grey["A100"]}`,
        boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
        "&:not(:last-child)": {
          borderBottom: 0,
        },
        "&:before": {
          display: "none",
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        "&:before": {
          borderRadius: "18px 18px 0 0 ",
        },
        marginLeft: 18,
      },
      content: {
        flexWrap: "wrap",
      },
      expandIconWrapper: {
        color: palette.primary.main,
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: 8,
        paddingLeft: 35,
        borderRadius: 18,
        //borderTop: "1px solid rgba(0, 0, 0, .125)",
        borderBottom: `1px solid ${palette.action.hover}`,
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: "40px",
      },
    },
  },

  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: "30px",
        paddingLeft: "30px !important",
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: "#ecf0f2",
        borderRadius: "6px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "0",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: "500",
        fontSize: "0.75rem",
      },
    },
  },
};

export default components;
