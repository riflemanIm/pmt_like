import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";
import SignInForm from "../src/components/Forms/SignInForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import { loginUser } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import validate from "../src/validation/validationSignIn";
import { deleteCookie } from "cookies-next";

export default function SignIn({ menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated, user },
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
        Вход для пользователя
      </Typography>
      <BaseCard>
        <SignInForm
          values={values}
          errors={errors}
          serverResponse={serverResponse}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={!loaded}
        />
      </BaseCard>
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  if (context.req?.cookies?.user)
    deleteCookie("user", { req: context.req, res: context.res });
  return { props: {} };
}
