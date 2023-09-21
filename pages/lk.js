import React, { useEffect } from "react";
import Router from "next/router";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";

import { useUserStateDispatch } from "../src/context/UserContext";

export default function SignIn({ menu }) {
  const {
    userState: { isAuthenticated, user },
  } = useUserStateDispatch();

  useEffect(() => {
    //
    if (!isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);
  console.log("user", user);
  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Личный кабинет
      </Typography>
      <BaseCard>
        Немного позже, здесь будут новости для клиентов, как индивидуальные, так
        и общие. А пока, весь что есть функционал доступен в меню пользователя
        (вверху сайта)
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
