"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import FullLayout from "../layouts/FullLayout";
import BaseCard from "../components/baseCard/BaseCard";
import img from "../../assets/images/bg/bg6.jpg";
import SignInForm from "../components/Forms/SignInForm";
import useForm from "../hooks/useForm";
import validate from "../validation/validationSignIn";
import { deleteCookie } from "cookies-next";
import { loginUser } from "../actions/user";
import { useUserStateDispatch } from "../context/UserContext";

export default function SignInClient() {
  const router = useRouter();
  const {
    userState: { loaded, serverResponse, isAuthenticated },
    userDispatch,
  } = useUserStateDispatch();

  // После успешного логина — переходим в ЛК
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/lk");
    }
  }, [isAuthenticated, router]);

  const onSubmit = () => {
    loginUser(userDispatch, values.login, values.password);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onSubmit,
    validate
  );

  return (
    <FullLayout img={img.src}>
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
