import React, { useEffect, useState } from "react";

import { createUser } from "../../actions/user";

import useForm from "../../hooks/useForm";
import validate from "../../validation/validationSignUp";

import SignUpForm from "../../components/Forms/SignUpForm";
import { Button, Typography } from "@mui/material";
import { useUserStateDispatch } from "../../context/UserContext";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function SignUp() {
  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push(getUrlbyLang("profile", locale));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const {
      userState: { loaded, serverResponse, isAuthenticated },
      userDispatch,
    } = useUserStateDispatch();

    useEffect(() => {
      //console.log("locale", locale);
      if (isAuthenticated) {
        Router.push(getUrlbyLang("profile", locale));
      }
    }, [isAuthenticated]);

    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push(getUrlbyLang("profile", locale));
    }
  }, [isAuthenticated]);

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
        Router.push(getUrlbyLang("signup", locale));
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
    setValues({
      // email: "oleglambin+1@gmail.com",
      // password: "Rock11city!",
      // repassword: "Rock11city!",
      // name: "Oleg",
      // jabber: "oleglambin@gmail.com",
      bilet,
      terms: true,
    });
  }, []);

  //console.log("=== terms ===", values.terms);

  const handleChangeTerms = (event) => {
    const vals = {
      ...values,
      terms: event.target.checked,
    };
    setValues(vals);
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        {t("SIGN.UP_BUTTON")}
      </Typography>
      <SignUpForm
        values={values}
        setValues={setValues}
        errors={errors}
        handleChange={handleChange}
        serverResponse={serverResponse}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setServerResponse={setServerResponse}
        handleSubmit={handleSubmit}
        handleDateChange={handleDateChange}
        handleChangeGender={handleChangeGender}
      />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setActiveTabId(0)}
        style={{ width: "100%", marginTop: 24 }}
      >
        {t("COMPONENT.BACK_ONE_STEP")}
      </Button>
    </>
  );
}

export default SignUp;
