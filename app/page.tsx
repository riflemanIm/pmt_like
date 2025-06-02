// File: app/page.tsx
import fs from "fs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import img from "../assets/images/bg/bg25.jpg";
import BaseCard from "../src/components/baseCard/BaseCard";
import FullLayout from "../src/layouts/FullLayout"; // клиентский ("use client" внутри)

// Импортируем наш клиентский компонент с аккордеонами
import Accordions from "./Accordions";

interface SearchParams {
  nonce?: string;
  redirect_uri?: string;
  state?: string;
  client_id?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { nonce, redirect_uri, state, client_id } = searchParams;

  // Важно: await cookies() перед использованием
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie && nonce) {
    return redirect("/signin");
  }

  if (!userCookie) {
    return <PageLayout />;
  }

  if (nonce && userCookie.value) {
    try {
      const user = JSON.parse(userCookie.value);
      const now = Date.now();

      const payload = {
        sub: `${user.id}`,
        iat: now,
        nonce,
        email: user.email,
        name: user.name,
      };

      const privateKey = fs.readFileSync("./data/jwtRS256.key");
      const id_token = sign(payload, privateKey, {
        expiresIn: "31d",
        algorithm: "RS256",
        allowInsecureKeySizes: true,
      });

      const redirectUrl = `${redirect_uri}?state=${state}&nonce=${nonce}&id_token=${id_token}&client_id=${client_id}`;
      return redirect(redirectUrl);
    } catch (err) {
      console.error("JWT Signing Error:", err);
      return <PageLayout />;
    }
  }

  return <PageLayout />;
}

function PageLayout() {
  // Серверный компонент: нет useState, только рендер текста и базовая разметка
  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Решения
      </Typography>

      <BaseCard>
        <Typography variant="h6" mb={6}>
          Высокое качество лечения и эффективный менеджмент медицинского
          учреждения невозможны без использования единой информационной системы
          и автоматизации бизнес-процессов. Для ключевых участников этих
          процессов мы подготовили комплексные и понятные решения.
        </Typography>
        Основой наших решений является медицинская информационная система{" "}
        <strong>Медиалог</strong>, разработанная для решения комплекса лечебных
        и управленческих задач, стоящих перед современной поликлиникой и
        стационаром. Сегодня, благодаря многолетнему опыту эксплуатации и
        развития системы, мы можем предложить полнофункциональный комплекс
        масштабируемых и открытых продуктов, созданных в соответствии со
        следующими принципами.
      </BaseCard>

      <Box sx={{ mt: 6 }}>
        {/* Клиентский компонент с аккордеонами */}
        <Accordions />
      </Box>
    </FullLayout>
  );
}
