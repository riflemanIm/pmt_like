import React, { useState } from "react";

// context
import { useUserStateDispatch } from "../../context/UserContext";

import { loginUser } from "../../actions/user";

//form func
import useForm from "../../hooks/useForm";
import validate from "../../validation/validationSignIn";

import SignInForm from "./SignInForm";
import { Button, Typography } from "@mui/material";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function SignIn({ setValsTab, setActiveTabId }) {
  // global

  const {
    userState: { loaded, serverResponse, isAuthenticated, user, newOrder },
    userDispatch,
  } = useUserStateDispatch();

  //console.log("loaded", loaded);

  const classes = useStyles();

  const login = () => {
    loginUser(userDispatch, values.login, values.password);
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    login,
    validate
  );

  // useEffect(() => {
  //   setValues({
  //     login: "rifleman",
  //     password: "rockcity",
  //   });
  // }, []);

  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        {t("SIGN.IN_BUTTON")}
      </Typography>
      <SignInForm
        values={values}
        errors={errors}
        serverResponse={serverResponse}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonWidth={"100%"}
      />
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setActiveTabId(1)}
        style={{ width: "100%" }}
      >
        {t("SIGN.UP_BUTTON")}
      </Button>
      <Button
        style={{ width: "100%", marginTop: 24 }}
        color="primary"
        variant="outlined"
        onClick={() => {
          setActiveTabId(2);
        }}
      >
        {t("SIGN.CH_PASS_BUTTON")}
      </Button>
    </>
  );
}

export default SignIn;
