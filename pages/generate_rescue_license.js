import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Alert, Box, Button, TextField as Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";
import LicenceForm from "../src/components/Forms/LicenceForm";

import { useUserStateDispatch } from "../src/context/UserContext";
import { getIpData, getRescueLicence } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import validate from "../src/validation/validationLicence";

export default function GenerateRescueLicence({ menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated, rescueLicence, user },
    userDispatch,
  } = useUserStateDispatch();
  // rescueLicence =
  //   "34E85FECA7A588D887EE0D8752B2763EF9411A0C128F0D10227B7442FE8AEE8C27830E101E8FB7E1D4C4A061425861D9C20C500B2BA67F398C57CF9339617CE95FE5CF59280029D9F8BC2724";

  const submitData = () => {
    getRescueLicence(userDispatch, values, user);
  };

  const { values, errors, handleChange, handleSubmit, setValues, setErrors } =
    useForm(submitData, validate);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
    if (isAuthenticated) {
      getIpData(setValues);
    }
  }, [isAuthenticated]);

  // console.log("rescueLicence", rescueLicence);

  const [copySuccess, setCopySuccess] = useState("");
  const handleCopy = () => {
    navigator.clipboard.writeText(rescueLicence);
    setCopySuccess(rescueLicence);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Получение аварийной лицензии
      </Typography>
      <BaseCard>
        {rescueLicence ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "warning.main",
              margin: 2,
            }}
          >
            <Input
              name="login"
              variant="outlined"
              value={rescueLicence}
              onChange={handleChange}
              margin="normal"
              type="text"
              fullWidth
            />
            {copySuccess !== rescueLicence ? (
              <Button
                sx={{ mt: 2 }}
                onClick={handleCopy}
                variant="contained"
                color="primary"
              >
                Скопировать
              </Button>
            ) : (
              <Alert severity="success">Скопировано</Alert>
            )}
          </Box>
        ) : (
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
