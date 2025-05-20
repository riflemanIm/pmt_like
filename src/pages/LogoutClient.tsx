"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import FullLayout from "../../src/layouts/FullLayout";
import img from "../../assets/images/bg/bg6.jpg";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button, Grid } from "@mui/material";
import { deleteCookie } from "cookies-next";
import { useUserStateDispatch } from "../../src/context/UserContext";

export default function LogoutClient() {
  const router = useRouter();
  const {
    userState: { isAuthenticated },
  } = useUserStateDispatch();

  // Удаляем куку при загрузке client-side
  useEffect(() => {
    deleteCookie("user");
    deleteCookie("auth_token");
  }, []);

  // Если вдруг снова залогинились автоматически, кидаем в /lk
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/lk");
    }
  }, [isAuthenticated, router]);

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Вы вышли из системы
      </Typography>
      <Grid container sx={{ maxWidth: 400, margin: "auto" }}>
        <Grid item xs={12} my={5} textAlign="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<LoginOutlinedIcon />}
            size="large"
            onClick={() => router.push("/signin")}
          >
            Войти
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            color="primary"
            variant="text"
            onClick={() => router.push("/signup")}
          >
            Регистрация
          </Button>
        </Grid>
      </Grid>
    </FullLayout>
  );
}
