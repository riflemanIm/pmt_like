import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg.jpg";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Products({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout menu={menu} img={img.src}>
      <Typography variant="h1" mb={8}>
        Продуктовая линейка
      </Typography>
      <BaseCard>
        {" "}
        <Typography variant="h6">
          Современная медицинская информационная система — это не только продукт
          для врачей. Решения Пост Модерн Текнолоджи позволяют автоматизировать
          все внутренние и внешние процессы медицинского учреждения.
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "primary.dark", width: "90%", flexShrink: 0 }}
            >
              МЕДИАЛОГ
            </Typography>

            <Typography sx={{ color: "text.secondary" }} my={1}>
              Медицинская информационная система
              МЕДИАЛОГ&nbsp;—&nbsp;флагманский продукт компании. <br />
              <br />
              МЕДИАЛОГ позволяет провести комплексную автоматизацию
              лечебно-профилактического учреждения любого уровня и масштабов.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" mt={3}>
              Гибкость, функциональная полнота и
              масштабируемость&nbsp;—&nbsp;вот что выгодно отличает МЕДИАЛОГ от
              других информационных систем. Благодаря возможностям тонкой
              настройки и модульности системы, у заказчика есть возможность
              автоматизировать все процессы, происходящие во всех подразделениях
              медицинского учреждения.
            </Typography>
            <Typography variant="body2" mt={3}>
              МЕДИАЛОГ&nbsp;—&nbsp;полноценная платформа для разработки
              медицинских приложений, что позволяет обученному персоналу
              ИТ-службы медицинских учреждений самостоятельно разрабатывать и
              настраивать интерфейсы пользователей, бизнес-процессы и
              отчетность.
            </Typography>
            <Typography variant="body2" mt={3}>
              Все модули информационной системы работают в единой среде данных,
              при этом каждый модуль отвечает за определённую функциональность и
              может быть приобретен отдельно, таким образом, система будет
              масштабироваться вместе с ростом клиники или расширением задач по
              её автоматизации.
            </Typography>
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
              sx={{ color: "info.main", width: "90%", flexShrink: 0 }}
            >
              МЕДИАЛОГ. КОЛЛЕКЦИЯ
            </Typography>
            <Typography variant="body2" my={1}>
              <strong> Медиалог</strong>.Коллекция — кристаллизованный опыт
              более чем 900 внедрений МИС МЕДИАЛОГ, десятки из которых - в
              крупнейших медицинских учреждениях страны, как многопрофильных,
              так и специализированных.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" my={1}>
              Это готовые к использованию наборы настроек платформы{" "}
              <strong> Медиалог</strong>, реализующие лучшие практики ведения
              бизнес-процессов, медицинских протоколов и отчетности.
              <br />
              <br />В настоящий момент <strong> Медиалог</strong>.Коллекция
              насчитывает свыше 50 готовых медицинских профилей как широкого
              профиля, так и узкой врачебной специализации. Полная информация о
              составе коллекции предоставляется по запросу.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Основные архитектурные свойства продукта:
            </Typography>
            <ul>
              <li>Версионность</li>
              <li>Совместимость с широким спектром версий ядра МИС МЕДИАЛОГ</li>
              <li>
                Возможность частичного переноса настроек из Коллекции в базы
                учреждений
              </li>
              <li>
                Возможность самостоятельной разработки на основе Коллекции
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "primary.main", width: "90%", flexShrink: 0 }}
            >
              ТЕЛЕМЕДИАЛОГ
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              С помощью компонент интеграционной шины Телемедиалог возможна
              интеграция МИС МЕДИАЛОГ с любыми внешними сервисами и
              операционными системами.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Возможности для интеграции
            </Typography>

            <ul>
              <li>Сайт клиники </li>
              <li>Специальные мобильные приложения</li>
              <li>Федеральная электронная регистратура</li>
              <li>ИЭМК</li>
              <li>Региональные сегменты сторонних производителей</li>
              <li>ТФОМС</li>
              <li>Региональные службы скорой помощи</li>
              <li>Внешние лаборатории</li>
              <li>Сервисы привлечения пациентов (лидогенерации)</li>
              <li>Сервисы СМС-рассылок</li>
              <li>и многие другие </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Основные качества Телемедиалог
            </Typography>

            <ol>
              <li>
                Документированный программный интерфейс (API) для внешних
                разработчиков
              </li>
              <li>Поддержка совместимости с новыми версиями МИС МЕДИАЛОГ</li>
              <li>
                Продуманная архитектура, обеспечивающая высокую скорость работы
                при минимальной загрузке базы данных
              </li>
            </ol>
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "success.main", width: "90%", flexShrink: 0 }}
            >
              MOBIAPP
            </Typography>
            <Typography my={1}>
              MOBIAPP MobiApp - готовое приложение для вашей клиники,
              реализуемое по принципу white label, то есть адаптируемое под ваш
              корпоративный стиль и представляемое пользователю под вашим
              брендом.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Функциональность приложения
            </Typography>

            <ul>
              <li>списки филиалов</li>
              <li>врачи</li>
              <li>виды приема</li>
              <li>расписания с различными уровнями доступа</li>
              <li>акции клиники</li>
              <li>push-уведомления о событиях в расписании</li>
              <li>персонифицированные и групповые рассылки</li>
              <li>выставление счетов для онлайн-оплаты</li>
              <li>электронная медицинская карта</li>
            </ul>
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "danger.main", width: "90%", flexShrink: 0 }}
            >
              МЕДИАЛОГ.BI
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              Продукт МЕДИАЛОГ.BI (Business Intelligence) предоставляет широкий
              спектр аналитической информации, которая является полезной для
              оперативных задач управления.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Продукт МЕДИАЛОГ.BI (Business Intelligence) предоставляет широкий
              спектр аналитической информации, которая является полезной для
              оперативных задач управления. Информация предоставляется в
              наглядном виде: динамика, отклонения от нормальных показателей.
              МЕДИАЛОГ.BI позволяет руководству и менеджменту клиники получить
              объективные показатели работы и увидеть реальную картину
              напряженности на разных участках ЛПУ на любом устройстве:
              телефоне, планшете, рабочем месте.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Группы показателей
            </Typography>

            <ul>
              <li>Мониторирование потоков</li>
              <li>Оценка эффективности работы врачей на приеме</li>
              <li>Финансовые потоки</li>
              <li>Критичные показатели</li>
              <li>Специфические для конкретного ЛПУ сводки</li>
            </ul>
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
