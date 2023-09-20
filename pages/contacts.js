import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg9.jpg";
import { Box } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PhoneIcon from "@mui/icons-material/Phone";
//import InfoIcon from "@mui/icons-material/Email";
import MailIcon from "@mui/icons-material/Mail";
const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Contacts({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Контакты
      </Typography>
      <BaseCard title="ООО «Пост Модерн Текнолоджи»">
        <Box
          sx={{ display: "flex", alignItems: "center", color: "error.main" }}
        >
          <PhoneIcon sx={{ transform: "scale(1.4)" }} />
          <Typography variant="subtitle1" my={2} ml={2}>
            + 7 (495) 780-60-51
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", color: "warning.main" }}
        >
          <MailIcon sx={{ transform: "scale(1.4)" }} />
          <Typography variant="subtitle1" my={2} ml={2}>
            pmt@pmtech.ru
          </Typography>
        </Box>{" "}
      </BaseCard>
      <BaseCard
        style={{
          marginTop: 32,
        }}
        title=" Москва, Гранатный переулок, дом 4, стр. 2"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.9272496358126!2d37.59059497734854!3d55.7597659730868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a49d0d76b3b%3A0xc5ce549dd19a7cdf!2sGranatnyy%20Pereulok%2C%20Moskva%2C%20123001!5e0!3m2!1sen!2sru!4v1690467784659!5m2!1sen!2sru"
          width="100%"
          height="450"
          style={{
            width: "100%",
            height: "450px",
            borderRadius: 12,
            border: 0,
          }}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>{" "}
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
