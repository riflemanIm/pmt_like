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

  useEffect(() => {
    setValues({
      login: "rtyshko",
      password: "valera",
    });
  }, []);

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
// export async function getServerSideProps(context) {
//   const locale = context.locale;
//   const postData1 = {
//     method: "Post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       locale,
//     }),
//   };
//   const res = await fetch(`${process.env.API_HOST}/api/menu`, postData1);
//   const menu = await res.json();

//   return { props: { menu } };
// }
