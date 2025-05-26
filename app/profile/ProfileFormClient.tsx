"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Typography from "@mui/material/Typography";
import img from "../../assets/images/bg/contact_bg.jpg";
import SignUpForm from "../../src/components/Forms/SignUpForm";
import useForm from "../../src/hooks/useForm";
import validate from "../../src/validation/validationSignUp";
import {
  profile,
  getUserData,
  checkAuth,
  getCountries,
} from "../../src/actions/user";
import { useUserStateDispatch } from "context/UserContext";
import useInterval from "hooks/useInterval";
import { CountryDto } from "types/dto";

export default function ProfileForm() {
  const {
    userState: { isAuthenticated, user, loaded, serverResponse },
    userDispatch,
  } = useUserStateDispatch();

  const router = useRouter();

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
        router.push("/signup");
      }

      if (serverResponse === "SUCCESS_CREATE") {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: null },
        });
        router.push("/signin");
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
      router.push("/signin");
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
      getUserData(setValues, user.email);
    }
  }, [isAuthenticated]);

  return (
    <FullLayout img={img.src}>
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
