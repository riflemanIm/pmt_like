import React from "react";
import { Box, DialogTitle, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  fullscreenButton: {
    position: "absolute",
    right: theme.spacing(6),
    top: theme.spacing(1),
  },
  title: { width: "94%" },
}));

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

export default function Modale({
  title,
  toggleFullscreen,
  fullScreen,
  toggleModal,
  children,
}) {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: 8,
          top: 12,
        }}
      >
        {!isMobile && (
          <IconButton
            aria-label="fullScreenBtn"
            onClick={toggleFullscreen}
            color="primary"
          >
            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        )}

        <IconButton aria-label="close" onClick={toggleModal} color="secondary">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      {children != null && children}
    </>
  );
}
