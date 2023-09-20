import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";
import LicenceForm from "../src/components/Forms/LicenceForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import { getRescueLicence } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import validate from "../src/validation/validationLicence";

export default function GenerateRescueLicence({ menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated, rescueLicence, user },
    userDispatch,
  } = useUserStateDispatch();

  const submitData = () => {
    getRescueLicence(userDispatch, values, user);
  };

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submitData, validate);
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setValues({
      login: "support",
      password: "pmtsupport",
      version: "8.105",
      code: "ABCDEF09",
      //      reason_standart: "Плановые работы",
      reason: "работы",
    });
  }, []);

  console.log("rescueLicence", rescueLicence);
  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Получение аварийной лицензии
      </Typography>
      <BaseCard>
        {rescueLicence ?? (
          <LicenceForm
            values={values}
            errors={errors}
            serverResponse={serverResponse}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            setErrors={setErrors}
            validate={validate}
            isLoading={!loaded}
          />
        )}
      </BaseCard>
    </FullLayout>
  );
}
// export async function getServerSideProps(context) {
//   const locale = context.locale;
//   const postData1 = {
//     method: "Post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       locale,
//     }),
//   };
//   const res = await fetch(`${process.env.API_URL}/menu`, postData1);
//   const menu = await res.json();

//   return { props: { menu } };
// }
