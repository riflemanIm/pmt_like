// app/lk/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";

import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";

import { useUserStateDispatch } from "../../src/context/UserContext";
import { checkAuth } from "../../src/actions/user";

import img from "../../assets/images/bg/bg2.jpg";

export default function AccountPage() {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  const router = useRouter();

  // on mount: verify token
  useEffect(() => {
    if (user.token) checkAuth(userDispatch, user.token);
  }, [userDispatch, user.token]);

  // redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Личный кабинет
      </Typography>
      <BaseCard>
        {/* Здесь в будущем будут новости для клиентов, как индивидуальные, так и общие.
            Пока весь доступный функционал — в меню пользователя (вверху сайта). */}
        Немного позже, здесь будут новости для клиентов, как индивидуальные, так
        и общие. А пока, весь что есть функционал доступен в меню пользователя
        (вверху сайта)
      </BaseCard>
    </FullLayout>
  );
}
