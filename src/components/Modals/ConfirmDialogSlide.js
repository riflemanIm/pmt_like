import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function ConfirmDialogSlide({
  isOpen,
  setState,
  typeReset,
  contentText,
  callback,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    setState({
      type: typeReset,
    });
  };
  const handleCloseOk = () => {
    setOpen(false);
    callback();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Typography variant="h6">{contentText}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('COMPONENT.BUT_CLOSE')}
        </Button>
        <Button onClick={handleCloseOk} color="warning">
          {t('COMPONENT.BUT_CONFIRM')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
