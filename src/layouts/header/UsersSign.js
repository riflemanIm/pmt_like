import React from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1.3),
  },
}));

export default function UsersSign() {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      variant="text"
      endIcon={<LoginOutlinedIcon />}
      className={classes.button}
      size="large"
      href="/signin"
    >
      Вход для пользователя
    </Button>
  );
}
