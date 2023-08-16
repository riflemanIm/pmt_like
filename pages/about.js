import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg20.jpg";
import { css } from "@emotion/css";
import { Card, CardContent, Grid } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Solution({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <div
        className={css`
          position: absolute;
          top: 628px;
          left: 80vw;
          z-index: 1;
          width: 251px;
          height: 251px;
          border-radius: 100%;
          background-color: #3b5f77;
        `}
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="300"
      >
        <div
          className={css`
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            width: 100%;
            transform: translate(-50%, -50%);
            padding: 10px;
          `}
        >
          <Typography variant="h2" sx={{ color: "#fff", fontSize: 44 }}>
            24 года
          </Typography>
          <Typography variant="body2" mt={2} sx={{ color: "#fff" }}>
            Компания основана в 1999 году.
          </Typography>
        </div>
      </div>
      <Typography variant="h1" mb={8}>
        О компании
      </Typography>
      <BaseCard>
        Компания «Пост Модерн Текнолоджи» (ПМТ) работает на рынке информационных
        технологий свыше 18 лет и в настоящий момент осуществляет свою
        деятельность на территории Европы, России и стран СНГ. ПМТ является
        одним из крупнейших разработчиков медицинских информационных систем
        (МИС) на территории РФ
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }} mt={3}>
          Компания является сертифицированным партнером компании Microsoft,
          поддерживает отношения с крупными ИТ-корпорациями среди которых CISCO
          Systems, Philips, Agfa, Zebra Technologies.
        </Typography>
        <Typography mt={3}>
          Компания имеет уникальный опыт реализации сложных проектов в области
          автоматизации медицинских инфраструктур любого масштаба. МИС
          «Медиалог», ключевой продукт компании, представляет собой комплексную
          медицинскую информационную систему, позволяющую автоматизировать
          деятельность лечебно-профилактических учреждений (ЛПУ) различных
          профилей, масштабов и специализаций. Данная система имеет в
          совокупности свыше 900 внедрений в крупных и средних ЛПУ России (более
          25 000 рабочих мест) и используется в более чем 500 ЛПУ Франции.
        </Typography>
        <Typography
          variant="h3"
          my={9}
          sx={{ color: "primary.dark", width: "80%", flexShrink: 0 }}
        >
          МИС «Медиалог» используют такие известные государственные и частные
          лечебные учреждения РФ как:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            ГКБ им. С.П.&nbsp;Боткина (Москва)
          </Grid>
          <Grid item xs={3}>
            НИИ Неотложной детской хирургии и&nbsp;травмотологии
            Л.М.&nbsp;Рошаля (Москва)
          </Grid>
          <Grid item xs={3}>
            Морозовская ДГКБ (Москва)
          </Grid>
          <Grid item xs={3}>
            Поликлиники ОАО "Газпром" (Москва, Санкт-Петербург)
          </Grid>
          <Grid item xs={3}>
            Центральная поликлиника ОАО "РЖД" (Москва)
          </Grid>
          <Grid item xs={3}>
            ФМБЦ им. А.И.&nbsp;Бурназяна ФМБА России (Москва)
          </Grid>
          <Grid item xs={3}>
            ФЦ Ортопедии и травматологии (Чебоксары)
          </Grid>
          <Grid item xs={3}>
            ФЦ Сердечно-сосудистой хирургии (Пенза)
          </Grid>
          <Grid item xs={3}>
            НИИ Патологии кровообращения им. Е.Н.&nbsp;Мешалкина (Новосибирск)
          </Grid>
          <Grid item xs={3}>
            НИИ Травматологии и ортопедии (Нижний Новгород)
          </Grid>
          <Grid item xs={3}>
            Институт хирургии им. А.В.&nbsp;Вишневского (Москва)
          </Grid>
          <Grid item xs={3}>
            Центральный военный госпиталь и сеть медицинских центров Спецстроя
            России (Москва)
          </Grid>
          <Grid item xs={3}>
            НЦАГиП им. В.И.&nbsp;Кулакова (Москва)
          </Grid>
          <Grid item xs={3}>
            Благотворительный центр женского здоровья "Белая Роза" (Москва)
          </Grid>
          <Grid item xs={3}>
            Сети клиник "Медси", "Мать и Дитя", "АВА-Петер", "Ниармедик",
            "Чайка", "Medswiss"
          </Grid>
        </Grid>
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
//   const res = await fetch(`${process.env.API_HOST}/api/menu`, postData1);
//   const menu = await res.json();

//   return { props: { menu } };
// }
