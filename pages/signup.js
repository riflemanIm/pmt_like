import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/contact_bg.jpg";
import SignUpForm from "../src/components/Forms/SignUpForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import { getCountries, profile } from "../src/actions/user";
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
          payload: { serverResponse: null },
        });
        Router.push("/signup");
      }

      if (serverResponse === "SUCCESS_CREATE") {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: null },
        });
        Router.push("/signin");
      }
    },
    serverResponse !== null,
    5000
  );

  const submit = () => {
    console.log("submit");
    profile(userDispatch, values);
  };

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submit, validate);

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    } else {
      setValues({
        ...values,
        country_id: values.country_id ?? 175,
      });
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
  const countries = await getCountries();
  return { props: { countries } };
}
