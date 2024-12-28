import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";

import { useUserStateDispatch } from "../src/context/UserContext";
import { checkAuth } from "../src/actions/user";
import NewYearGreeting from "../src/components/NewYearGreeting";
//import img from "../assets/images/bg/bg_hny1.webp";
import img from "../assets/images/bg/bg2.jpg";

export default function SignIn({ menu }) {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, []);
  useEffect(() => {
    //
    if (!isAuthenticated) {
      Router.push("/signin");
    }
  }, [isAuthenticated]);
  console.log("user", user);
  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Личный кабинет
      </Typography>
      <BaseCard>
        <NewYearGreeting />
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
