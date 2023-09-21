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

export default function SignIn({ countries, menu }) {
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
        Router.push("/signin");
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

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submit, validate);

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    }
  }, [isAuthenticated]);

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Регистрация
      </Typography>
      <BaseCard>
        <SignUpForm
          values={values}
          errors={errors}
          setValues={setValues}
          setErrors={setErrors}
          validate={validate}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          serverResponse={serverResponse}
          isLoading={!loaded}
          countries={countries}
        />
      </BaseCard>
    </FullLayout>
  );
}
export async function getServerSideProps() {
  const postData = {
    method: "Get",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(`${process.env.API_URL}/countries`, postData);
  const countries = await res.json();

  return { props: { countries } };
}
