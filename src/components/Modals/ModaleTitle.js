import React from 'react';
import { DialogTitle, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  fullscreenButton: {
    position: 'absolute',
    right: theme.spacing(6),
    top: theme.spacing(1),
  },
  title: { width: '94%' },
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
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );
  return (
    <>
      {!isMobile && (
        <IconButton
          aria-label="fullScreenBtn"
          className={classes.fullscreenButton}
          onClick={toggleFullscreen}
        >
          {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      )}

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={toggleModal}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      {children != null && children}
    </>
  );
}
