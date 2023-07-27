import React from "react";
import { Typography, Button, Box } from "@mui/material";
// import Image from "next/image";
// import effectImg from "../../../public/img/effect.png";
import BaseCard from "../baseCard/BaseCard";

const Effect = () => {
  return (
    <>
      <Typography variant="h1" mb={6}>
        MИС МЕДИАЛОГ: доказанная экономия бюджета и времени врачей.
      </Typography>
      <BaseCard
        style={{
          backgroundColor: "#fdfdfdd9",
          backdropFilter: "saturate(180%) blur(5px)",
        }}
      >
        <Typography variant="body2" mt={1}>
          Результаты, полученные в ходе исследования опыта использования МИС
          МЕДИАЛОГ в Федеральном центре травматологии, ортопедии и
          эндопротезирования (ФЦТОЭ) г. Чебоксары.
        </Typography>
        {/* <BaseCard title="Sales Overview"></BaseCard> */}
        <Button variant="contained" sx={{ mt: 2 }} color="error">
          Далее
        </Button>
      </BaseCard>
    </>
  );
};

export default Effect;
