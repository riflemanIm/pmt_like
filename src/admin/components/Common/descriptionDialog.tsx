import React from "react";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import MDEditor from "@uiw/react-markdown-editor";
import config from "../../config";

export const transformImageUri =
  (section: string) =>
  (src: string): string => {
    if (src.startsWith("images/"))
      return `${config.baseURLApi}/docs/${section}/${src}`;
    return src;
  };

interface DescriptionDialogProps {
  isOpen: boolean;
  section: string;
  title?: string;
  text?: string;
  onClose: () => void;
}

const DescriptionDialog = ({
  isOpen,
  section,
  title,
  text,
  onClose,
}: DescriptionDialogProps): JSX.Element => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      scroll={"body"}
      maxWidth="md"
      fullWidth
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{title}</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="container" data-color-mode="light">
          <MDEditor.Markdown
            source={text}
            urlTransform={transformImageUri(section)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionDialog;
