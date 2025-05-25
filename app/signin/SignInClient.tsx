"use client";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import img from "../../assets/images/bg/bg6.jpg";
import { loginUser } from "actions/user";
import BaseCard from "components/baseCard/BaseCard";
import SignInForm from "components/Forms/SignInForm";
import { useUserStateDispatch } from "context/UserContext";
import useForm from "hooks/useForm";
import FullLayout from "layouts/FullLayout";
import validate from "validation/validationSignIn";

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
    if (!values.login || !values.password) {
      return;
    }
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
