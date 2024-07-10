import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/contact_bg.jpg";
import SignUpForm from "../src/components/Forms/SignUpForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import {
  checkAuth,
  getCountries,
  getUserData,
  profile,
} from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import useInterval from "../src/hooks/useInterval";
import validate from "../src/validation/validationSignUp";

export default function SignIn({ countries, menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, []);

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
    50000
  );

  const submit = () => {
    profile(userDispatch, values);
  };

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submit, validate);

  useEffect(() => {
    //console.log("user", user);
    if (!isAuthenticated) {
      Router.push("/signin");
    } else {
      getUserData(setValues, user.email);
    }
  }, [isAuthenticated]);

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Профиль
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
          beginigText="Здесь вы можете отредактировать данные профиля"
        />
      </BaseCard>
    </FullLayout>
  );
}
export async function getServerSideProps() {
  const countries = await getCountries();
  return { props: { countries } };
}
