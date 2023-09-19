import { alpha } from "@mui/material";
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
        maxWidth: 1600,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        "& span > svg": {
          color: palette.primary.main,
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        color: palette.primary.dark,
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none",
        height: 46,
        minWidth: 200,
        borderRadius: 9,
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 9,

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
  MuiListItemButton: {
    styleOverrides: {
      root: {
        color: palette.primary.light,
        borderRadius: 9,
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 40,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        padding: 14,
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

  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: 30,
        paddingLeft: "30px !important",
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: "#ecf0f2",
        borderRadius: 6,
      },
    },
  },
  // MuiMenuItem: {
  //   styleOverrides: {
  //     root: {
  //       borderRadius: 0,
  //     },
  //   },
  // },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: "0.75rem",
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      underline: {
        "&:before": {
          borderBottom: "1px solid rgb(196 196 196)",
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid rgb(97, 87, 255, 0.3)",
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(palette.primary.dark, 0.12),
        "&:hover": {
          backgroundColor: alpha(palette.primary.dark, 0.16),
        },
        "&.Mui-focused": {
          backgroundColor: palette.action.focus,
        },
        "&.Mui-disabled": {
          backgroundColor: palette.action.disabledBackground,
        },
      },
      underline: {
        "&:before": {
          borderBottomColor: alpha(palette.primary.dark, 0.48),
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 9,
        backgroundColor: "transparent",
        "&.Mui-focused": {
          backgroundColor: "#fff",
        },
        "& fieldset": {
          borderColor: alpha(palette.primary.dark, 0.32),
        },
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(palette.primary.main, 0.2),
        },
        "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(palette.primary.main, 0.2),
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.primary.dark, // root border color
          borderWidth: "2px",
        },
        "&.Mui-focused fieldset": {
          borderWidth: "2px",
        },
      },
    },
  },
};

export default components;
