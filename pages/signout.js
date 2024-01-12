import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import img from "../assets/images/bg/bg6.jpg";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useUserStateDispatch } from "../src/context/UserContext";
import { loginUser } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import validate from "../src/validation/validationSignIn";
import { Button } from "@mui/material";
import { deleteCookie } from "cookies-next";

export default function SignIn({ menu }) {
  const {
    userState: { isAuthenticated },
    userDispatch,
  } = useUserStateDispatch();

  const login = () => {
    loginUser(userDispatch, values.login, values.password);
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    login,
    validate
  );

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   setValues({
  //     login: "osipchuk@postmodern.ru",
  //     password: "bh4G93eT",
  //   });
  // }, []);

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Вы вышли из системы
      </Typography>
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
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  if (context.req?.cookies?.user)
    deleteCookie("user", { req: context.req, res: context.res });
  return { props: {} };
}
