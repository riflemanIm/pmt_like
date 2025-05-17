"use client";
import React, { useCallback, useState } from "react";
import { Dialog, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import ModaleTitle from "./ModaleTitle";
import classNames from "classnames";

// Fix: Get theme properly and use default values for missing properties
const useStyles = makeStyles((theme) => {
  // Default colors in case the theme properties are missing
  const primaryHero =
    theme?.palette?.primary?.hero || theme?.palette?.primary?.main || "#1976d2";
  const primaryLighter =
    theme?.palette?.primary?.lighter ||
    theme?.palette?.primary?.light ||
    "#42a5f5";

  return {
    conteiner: {
      minWidth: 320,
      overflowY: "auto",
      overflowX: "hidden",
      scrollbarWidth: "thin",
      scrollbarColor: `${primaryHero} #fff`,
      "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        borderRadius: 8,
        backgroundColor: primaryLighter,
        border: "5px solid #fff",
      },
      "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
        {
          backgroundColor: primaryLighter,
          border: "3px solid #fff",
        },
      "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
        backgroundColor: primaryLighter,
        border: "3px solid #fff",
      },
      "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
        backgroundColor: "#fff",
      },
    },
    scrollHide: {
      overflowY: "hidden",
    },
    dialog: {
      borderRadius: 24,
      [theme.breakpoints?.down("md")]: {
        borderRadius: 4,
      },
    },
    backdrop: {
      "& .MuiBackdrop-root": {
        backgroundColor: `${
          theme?.palette?.grey?.[500] || "#9e9e9e"
        } !important`,
      },
    },
  };
});

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function Modale({
  open,
  toggleModal,
  title,
  children,
  mx = 3,
  my = 0,

  height = 570,
  maxWidth = "md",
  isScrollHide = false,
  backdrop = false,
}) {
  const classes = useStyles();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [fullScreen, setFullScreen] = useState(isMobile);

  const toggleFullscreen = useCallback(() => {
    setFullScreen(!fullScreen);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }, [isMobile, fullScreen]);

  return (
    <Dialog
      open={open}
      onClose={toggleModal}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      classes={{
        paper: classes.dialog,
        root: backdrop && classes.backdrop,
      }}
    >
      <ModaleTitle
        title={title}
        toggleFullscreen={toggleFullscreen}
        fullScreen={fullScreen}
        toggleModal={toggleModal}
      />

      <Box
        mx={mx}
        my={my}
        style={{
          height: fullScreen || isMobile ? "100%" : `${height}px`,
        }}
        className={classNames(
          classes.conteiner,
          isScrollHide && classes.scrollHide
        )}
      >
        {children}
      </Box>
    </Dialog>
  );
}
