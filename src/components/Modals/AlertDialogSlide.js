import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
//import DialogTitle from "@mui/material/DialogTitle";
import Slide from '@mui/material/Slide';
import { Button, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Loading from '../Loading';
import Marked from 'react-markdown';
import { useUserStateDispatch } from '../../context/UserContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
  },
  containerInfo: {
    padding: '32px 64px',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '8px 8px',
    },
  },
  root: {
    '& .MuiPaper-rounded': {
      borderRadius: 24,
      [theme.breakpoints.down('md')]: {
        borderRadius: 4,
      },
    },
  },
  buttonSubmit: {
    height: theme.spacing(6),
  },
  marked: {
    '& p': { margin: theme.spacing(2) },
  },
}));

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function AlertDialogSlide({
  state,
  setState,
  typeRset,
  isOpen,
  contentTextOk,
  contentTextOkDetail,
  doCallbackWhenOk = null,
  doCallbackWhenErr = null,
  doOnClose = null,
  buttonTitle = null,
  keyImg = 'alterDone',
  showLoading = false,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  const { t } = useTranslation();
  const {
    userState: { appInfo },
  } = useUserStateDispatch();

  const handleClose = () => {
    setOpen(false);
    if (typeRset != null)
      setState({
        type: typeRset,
      });
    if (doOnClose != null) {
      doOnClose();
    }
  };
  const handleCloseAndCallback = () => {
    setOpen(false);
    if (typeRset != null)
      setState({
        type: typeRset,
      });
    if (doCallbackWhenOk != null) {
      doCallbackWhenOk();
    }
    if (doCallbackWhenErr != null && state?.serverError != null) {
      doCallbackWhenErr(state?.serverError);
    }
  };

  const severity =
    state?.serverError != null && state?.serverError !== ''
      ? 'error'
      : 'success';

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        root: classes.root,
      }}
    >
      <DialogContent className={classes.container}>
        <Grid container spacing={2} className={classes.containerInfo}>
          {state.isLoaded &&
            contentTextOk &&
            severity === 'success' && (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <img
                  src={appInfo[keyImg]}
                  alt={contentTextOk}
                  style={{ margin: '8px auto' }}
                />

                <Typography
                  variant="h5"
                  style={{ margin: '24px auto' }}
                >
                  {contentTextOk}
                </Typography>
                {contentTextOkDetail && (
                  <Typography
                    variant="h6"
                    className={classes.marked}
                    style={{
                      textAlign:
                        contentTextOkDetail.length > 40
                          ? 'left'
                          : 'center',
                    }}
                  >
                    {<Marked>{contentTextOkDetail}</Marked>}
                  </Typography>
                )}
              </Grid>
            )}
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {state.isLoaded &&
              state?.serverError != null &&
              state?.serverError !== '' &&
              (!showLoading ? (
                <Alert severity="error">
                  <Typography variant="body2">
                    {state.serverError}
                  </Typography>
                </Alert>
              ) : (
                <Loading msg={state.serverError} isLinear={true} />
              ))}

            {!state.isLoaded && <Loading />}
          </Grid>
          {state.isLoaded && (
            <>
              <Grid
                item
                xs={12}
                style={{ textAlign: 'center', margin: '8px auto' }}
              >
                <Button
                  className={classes.buttonSubmit}
                  onClick={handleCloseAndCallback}
                  variant="contained"
                  color="primary"
                >
                  {buttonTitle != null && severity === 'success'
                    ? buttonTitle
                    : t('COMPONENT.BUT_CLOSE')}
                </Button>
              </Grid>
              {buttonTitle != null && severity === 'success' && (
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: 'center', margin: '8px auto' }}
                >
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="primary"
                  >
                    {t('COMPONENT.BUT_CLOSE')}
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
