"use client";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "layouts/FullLayout";
import BaseCard from "components/baseCard/BaseCard";
import img from "../../assets/images/bg/contact_bg.jpg";
import SignUpForm from "components/Forms/SignUpForm";

import { useUserStateDispatch } from "context/UserContext";
import { getCountries, profile } from "actions/user";

import useInterval from "hooks/useInterval";
import validate from "validation/validationSignUp";
import { CountryDto } from "types/dto";
import useForm from "hooks/useForm";

export default function SignUpClient() {
  const {
    userState: { loaded, serverResponse, isAuthenticated },
    userDispatch,
  } = useUserStateDispatch();

  const [countries, setCountries] = useState<CountryDto[]>();

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
    profile(userDispatch, values);
  };

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submit, validate);

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    } else {
      (async () => {
        try {
          const res = await getCountries();
          setCountries(res);
          console.log("res", res);
        } catch (error) {
          console.log("error getCountries", error);
        }
      })();

      setValues({
        ...values,
        country_id: values.country_id ?? 175,
      });
    }
  }, [isAuthenticated]);

  return (
    <FullLayout img={img.src}>
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
