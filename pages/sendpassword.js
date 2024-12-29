import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";

import { useUserStateDispatch } from "../src/context/UserContext";
import { sendPass } from "../src/actions/user";
import useForm from "../src/hooks/useForm";
import validate from "../src/validation/validationSendPass";
import { deleteCookie } from "cookies-next";
import SendPasswordForm from "../src/components/Forms/SendPass";

export default function SendPassword({ menu }) {
  const {
    userState: { loaded, serverResponse, isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const sendPassword = () => {
    sendPass(userDispatch, values.login);
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    sendPassword,
    validate
  );

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push("/lk");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   setValues({
  //     login: "oleglambin@gmail.com",
  //     //      password: "bh4G93eT",
  //   });
  // }, []);

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Выслать пароль
      </Typography>
      <BaseCard>
        <SendPasswordForm
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
export async function getServerSideProps(context) {
  if (context.req?.cookies?.user)
    deleteCookie("user", { req: context.req, res: context.res });
  return { props: {} };
}
