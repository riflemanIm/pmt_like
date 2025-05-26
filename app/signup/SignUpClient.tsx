"use client";
import Typography from "@mui/material/Typography";
import BaseCard from "components/baseCard/BaseCard";
import SignUpForm from "components/Forms/SignUpForm";
import FullLayout from "layouts/FullLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import img from "../../assets/images/bg/contact_bg.jpg";

import { getCountries, profile } from "actions/user";
import { useUserStateDispatch } from "context/UserContext";

import useForm from "hooks/useForm";
import useInterval from "hooks/useInterval";
import { CountryDto } from "types/dto";
import validate from "validation/validationSignUp";

export default function SignUpClient() {
  const router = useRouter();
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
      router.push("/lk");
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
      // setValues({
      //   email: "oleglambin+12@gmail.com",
      //   name: "OLEG LAMBIN",
      //   phone: "89262223155",
      //   country_id: 175,
      //   town: "Балашиха",
      //   address: "ул. Рождественская, мкр. Железнодорожный, г. Балаш",
      //   company: "pmt",
      //   ip: "194.147.93.12",
      //   link: "",
      //   role: "user",
      //   password: "Rock11city!",
      //   repassword: "Rock11city!",
      // });

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
