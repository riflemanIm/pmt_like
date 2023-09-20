import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg3.jpg";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Innovations({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Инновации в сфере здравоохранения
      </Typography>
      <BaseCard>
        {" "}
        <Typography variant="h6">
          Приоритетным направлением в развитии нашей компании является
          построение, развитие и оптимизация партнёрской сети. Мы строим
          системные отношения с партнёрами, которые в России и за её пределами
          продвигают и внедряют медицинскую информационную систему МЕДИАЛОГ. И
          мы заинтересованы в тех, кто готов к сотрудничеству.
        </Typography>
      </BaseCard>

      <div style={{ marginTop: 48 }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="h3" my={1} sx={{ color: "primary.dark" }}>
              Телемедиалог
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" my={1}>
              Интеграционная шина Телемедиалог, обеспечивающая интеграцию как с
              другими МИС, так и со многими внешними сервисами, среди которых:
            </Typography>
            <ul>
              <li>Федеральная электронная регистратура</li>
              <li>ИЭМК</li>
              <li>Региональные сегменты сторонних производителей</li>
              <li>ТФОМС</li>
              <li>Региональные службы скорой помощи</li>
              <li>Внешние лаборатории</li>
              <li>Сервисы привлечения пациентов (лидогенерации)</li>
              <li>Сервисы СМС-рассылок</li>
              <li>и многие другие</li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography variant="h3" my={1} sx={{ color: "info.main" }}>
              Мобильный кардиомониторинг
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" my={1}>
              Благодаря решению «Мобильный телемедиалог» практически любая
              клиника сможет оперативно начать оказывать своим пациентам новую
              коммерческую услугу мобильной медицины без первоначальных
              капитальных затрат.
            </Typography>
            <Typography
              variant="subtitle2"
              my={1}
              sx={{ color: "text.secondary" }}
            >
              Данная услуга показана пациентам:
            </Typography>

            <ul>
              <li>в случаях диагностики аритмий,</li>
              <li>с хроническими сердечно-сосудистыми заболеваниями,</li>
              <li>после госпитализации,</li>
              <li>
                желающим проводить мониторинг ЭКГ в профилактических целях —
                дома, на работе.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography variant="h3" my={1} sx={{ color: "primary.main" }}>
              Сквозное штрих-кодирование
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Платформа МИС МЕДИАЛОГ и Коллекция Настроек позволяют
              воспользоваться всеми преимуществами сквозной идентификации всех
              основных сущностей, с которыми работает информационная система. В
              сотрудничестве с мировым лидером в этой области, компанией Zebra
              Technologies, созданы уникальные решения для маркировки и
              идентификации биоматериала и результатов лабораторных анализов-
              расходных материалов и лекарственных препаратов, пациентов и
              персонала, направлений на исследования и консультации, медицинских
              карт, результатов диагностических исследований.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography variant="h3" my={1} sx={{ color: "success.main" }}>
              Репродуктивные технологии
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              В результате многолетнего сотрудничества с ведущими российскими
              медицинскими учреждениями соответствующего профиля, на платформе
              МЕДИАЛОГ созданы глубоко проработанные тиражируемые модули для
              репродуктивных технологий, зарекомендовавшие себя в таких
              учреждениях, как НЦАГиП им. Кулакова (Москва), сети клиник "Мать и
              Дитя", "АВА-ПЕТЕР/Скандинавия", "Клиники Нуриевых" и многих
              других.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography variant="h3" my={1} sx={{ color: "danger.main" }}>
              Рабочее место руководителя
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              МИС МЕДИАЛОГ предоставляет широкий спектр аналитической
              информации, необходимой для оперативных задач управления, включая
              динамику и отклонения от нормативных показателей по различным
              срезам функционирования ЛПУ. Благодаря технологиям Microsoft
              Analysis Services и Power BI, информация предоставляется в
              наглядном виде на устройствах любых платформ. На уровне региона
              или сети клиник эта функциональность позволяет создать
              ситуационный центр. На уровне главврача - оперативную картину
              напряженности на разных участках ЛПУ.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
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
