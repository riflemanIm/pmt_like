import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";

interface GenericDialogProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFullScreen?: (fullScreen: boolean) => void;
}

const GenericDialog = ({
  isOpen,
  title,
  children,
  onClose,
  onFullScreen,
}: GenericDialogProps): JSX.Element => {
  const { t } = useTranslation();

  const [fullScreen, setFullScreen] = React.useState(false);

  React.useEffect(() => {
    if (onFullScreen) {
      onFullScreen(fullScreen);
    }
  }, [fullScreen]);

  const contentHeight = fullScreen ? "calc(100vh - 130px)" : "350px";

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      scroll={"body"}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="alert-dialog-title" sx={{ pr: 0 }}>
        <Box
          justifyContent="space-between"
          display="flex"
          alignItems={"flex-start"}
        >
          <Box>{title}</Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems={"flex-end"}
            sx={{ pr: 1 }}
          >
            <IconButton
              aria-label={fullScreen ? "restore" : "maximize"}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
            <IconButton aria-label="close" onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          pr: 1,
          pl: 1,
          height: contentHeight,
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>{t("COMMON.CLOSE")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
