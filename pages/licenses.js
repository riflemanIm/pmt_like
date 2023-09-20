import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import ProductTariffs from "../src/components/dashboard/ProductTariffs";
import img from "../assets/images/bg/bg23.jpg";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

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
        Лицензионная политика
      </Typography>
      <BaseCard>
        Приоритетным направлением в развитии нашей компании является построение,
        развитие и оптимизация партнёрской сети. Мы строим системные отношения с
        партнёрами, которые в России и за её пределами продвигают и внедряют
        медицинскую информационную систему МЕДИАЛОГ. И мы заинтересованы в тех,
        кто готов к сотрудничеству.
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "primary.dark", width: "45%", flexShrink: 0 }}
            >
              Лицензии
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Для использования определенной функциональности системы МЕДИАЛОГ
              на компьютерах, объединённых в локальную сеть, необходимо
              приобрести лицензии на модули и опции модулей системы. Лицензии
              дают право на использование возможностей приобретенных модулей на
              рабочих местах медицинского учреждения.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Набор модулей и опций системы МЕДИАЛОГ, который используется
              медицинским учреждением в локальной компьютерной сети с единой
              базой данных, называется сетевой конфигурацией системы.
            </Typography>

            <ol>
              <li>
                Дают право на использование системы МЕДИАЛОГ в медицинском
                учреждении, указанном в лицензионном&nbsp;соглашении
              </li>
              <li>Являются бессрочными</li>
            </ol>
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "info.main", width: "45%", flexShrink: 0 }}
            >
              Типы лицензий
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h4">
              <FeatherIcon
                icon="monitor"
                width="32"
                height="32"
                style={{ margin: "18 10 -8 -6" }}
              />
              На рабочие места
            </Typography>
            <Typography mt={3}>
              Это наиболее распространенный тип лицензии - он означает, что для
              использования функциональности модуля (или опции), например, на 10
              рабочих местах необходимо приобрести 10 лицензий на данный модуль
              (опцию).
            </Typography>
            <Typography variant="h4" mt={3}>
              <FeatherIcon
                icon="server"
                width="32"
                height="32"
                style={{ margin: "18 10 -8 -6" }}
              />
              На сервер
            </Typography>
            <Typography mt={3}>
              Серверные лицензии означают, что функциональность модуля (опции)
              будет доступна на всех рабочих местах, гду установлена система.
            </Typography>

            <Typography variant="h4" mt={3}>
              <FeatherIcon
                icon="cpu"
                width="32"
                height="32"
                style={{ margin: "18 10 -8 -6" }}
              />
              На прибор
            </Typography>
            <Typography mt={3}>
              Данный тип лицензии выдается на прибор (чаще всего это
              подключаемое к системе медицинское оборудование).
            </Typography>
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "success.main", width: "45%", flexShrink: 0 }}
            >
              Тарифные планы
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Предусмотрено 4 тарифных плана приобретения системы МЕДИАЛОГ:
              МОДУЛЬНЫЙ, COMPACT , STANDART и ENTERPRISE. Каждый тарифный план
              адаптирован под определенные функциональные потребности.
              Правильный выбор тарифного плана оптимизирует траты медицинского
              учреждения на информационную систему.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" mt={3}>
              Тарифы Сompact, Standart и Еnterprise предусматривают приобретение
              наборов модулей, адаптированных для медицинский учреждений разных
              типов.
            </Typography>
            <ProductTariffs />
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
