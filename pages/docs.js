import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg16.jpg";
import { Button, Link, Box } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Licenses({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Документация
      </Typography>
      <BaseCard
        style={{
          paddingLeft: 32,
        }}
      >
        <Box mb={5}>
          <Typography variant="h4" my={2}>
            Документация <strong> Медиалог</strong> 7.50+
          </Typography>
          <Button
            component={Link}
            //to="/about"
            variant="contained"
            download
            href="/docs/medialog_doc.zip"
          >
            скачать
          </Button>
        </Box>
        <Box my={5}>
          <Typography variant="h4" my={2}>
            Технические требования
          </Typography>
          <Button
            component={Link}
            //to="/about"
            variant="contained"
            color="info"
            href="/docs/medialog_tech.pdf"
          >
            скачать
          </Button>
        </Box>
        <Box mt={5}>
          <Typography variant="h4" my={2}>
            Карта функциональности
          </Typography>
          <Button
            component={Link}
            //to="/about"
            variant="contained"
            color="success"
            href="/docs/medialog_solution.pdf"
          >
            скачать
          </Button>
        </Box>
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
