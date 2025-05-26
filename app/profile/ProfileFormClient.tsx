"use client";
import Typography from "@mui/material/Typography";
import { useUserStateDispatch } from "context/UserContext";
import useInterval from "hooks/useInterval";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CountryDto } from "types/dto";
import img from "../../assets/images/bg/contact_bg.jpg";
import { getCountries, getUserData, profile } from "actions/user";
import BaseCard from "components/baseCard/BaseCard";
import SignUpForm from "components/Forms/SignUpForm";
import useForm from "hooks/useForm";
import FullLayout from "layouts/FullLayout";
import validate from "validation/validationSignUp";

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
      getUserData(setValues, user.id);
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
