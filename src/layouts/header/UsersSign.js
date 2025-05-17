import React from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

export default function UsersSign() {
  return (
    <Button
      color="primary"
      variant="text"
      endIcon={<LoginOutlinedIcon />}
      size="large"
      href="/signin"
      sx={{
        mr: 1.3,
      }}
    >
      Вход для пользователя
    </Button>
  );
}
