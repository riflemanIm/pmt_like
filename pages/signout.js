import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import img from "../assets/images/bg/bg6.jpg";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useUserStateDispatch } from "../src/context/UserContext";
import { Button, Grid } from "@mui/material";
import { deleteCookie } from "cookies-next";

export default function SignIn({ menu }) {
  const {
    userState: { isAuthenticated },
  } = useUserStateDispatch();

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    }
  }, [isAuthenticated]);

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Вы вышли из системы
      </Typography>
      <Grid
        container
        sx={{
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <Grid item xs={12} my={5} textAlign="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<LoginOutlinedIcon />}
            size="large"
            href="/signin"
          >
            Войти
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button color="primary" variant="text" href="/signup">
            Регистрация
          </Button>
        </Grid>
      </Grid>
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  if (context.req?.cookies?.user)
    deleteCookie("user", { req: context.req, res: context.res });
  return { props: {} };
}
