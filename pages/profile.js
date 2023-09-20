import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";

import { useUserStateDispatch } from "../src/context/UserContext";

export default function SignIn({ menu }) {
  const {
    userState: { isAuthenticated },
  } = useUserStateDispatch();

  useEffect(() => {
    //console.log("locale", locale);
    if (!isAuthenticated) {
      Router.push("/signin");
    }
  }, [isAuthenticated]);

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Профиль
      </Typography>
      <BaseCard></BaseCard>
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
