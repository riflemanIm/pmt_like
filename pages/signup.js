import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/contact_bg.jpg";
import SignUpForm from "../src/components/Forms/SignUpForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import { createUser } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import useInterval from "../src/hooks/useInterval";
import validate from "../src/validation/validationSignUp";

export default function SignIn({ menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated },
    userDispatch,
  } = useUserStateDispatch();

  useInterval(
    () => {
      if (
        serverResponse === "SOMETHING_WRONG" ||
        serverResponse === "EMAIL_EXISTS"
      ) {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: null,
        });
        Router.push("/signup");
      }

      if (serverResponse === "SUCCESS_CREATE") {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: null,
        });
        Router.push(getUrlbyLang("signin", locale));
      }
    },
    serverResponse !== null,
    5000
  );

  const submit = () => {
    console.log("submit");
    delete values.repassword;
    createUser(userDispatch, values);
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submit,
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
        Регистрация
      </Typography>
      <BaseCard>
        <SignUpForm
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
