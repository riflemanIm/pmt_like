import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg11.jpg";
import { Button } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))({});

export default function Partnership({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Партнерская программа
      </Typography>
      <BaseCard>
        Приоритетным направлением в развитии нашей компании является построение,
        развитие и оптимизация партнёрской сети. Мы строим системные отношения с
        партнёрами, которые в России и за её пределами продвигают и внедряют
        медицинскую информационную систему МЕДИАЛОГ. Станьте нашим партнером на
        растущем высокотехнологичном рынке!
      </BaseCard>

      <div style={{ marginTop: 48 }}>
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
              Мы разработали продукт, свойства которого уникальны
            </Typography>
            <Typography variant="body2" my={1}>
              Система МЕДИАЛОГ - один из лучших продуктов,
              <strong>
                {" "}
                адаптированных к потребностям российских врачей.{" "}
              </strong>
              Это признано многими специалистами и независимыми экспертами.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" my={1}>
              МЕДИАЛОГ обладает рядом преимуществ не только для пользователей,
              но и для партнеров, которые распространяют и внедряют МЕДИАЛОГ.
            </Typography>
            <Typography variant="body2" my={1}>
              Главное преимущество для партнёров в том, что МЕДИАЛОГ – не только
              удачный, но и редкий пример медицинской информационной системы,
              которая отчуждаема от разработчика. Партнер сам может адаптировать
              МЕДИАЛОГ под нужды своих клиентов. У многих компаний есть опыт
              успешного самостоятельного внедрения МЕДИАЛОГ в разных регионах
              России и СНГ.
            </Typography>
            <Typography variant="body2" my={1}>
              Кроме того, МЕДИАЛОГ активно развивается и расширяет свой
              функционал. В настоящее время идет разработка новой версии —
              «МЕДИАЛОГ 2.0». Это полностью отечественная разработка, основанная
              на современных технологических принципах и подходах. Ключевые
              технологические решения включают микросервисную архитектуру,
              веб-интерфейс, а также использование программного обеспечения с
              открытым исходным кодом (Open Source), что значительно повышает
              эффективность, надежность и безопасность нашей медицинской
              информационной системы. Внедрение новой версии запланировано на
              первое полугодие 2026 года.
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
            <Typography variant="h3" my={1} sx={{ color: "primary.main" }}>
              Мы поддерживаем партнера
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              Мы оказываем поддержку бизнесу партнеров и стремимся создавать
              максимально комфортные условия при его сопровождении.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              При обращении нового клиента непосредственно к нам, мы рекомендуем
              наших партнеров, которые находятся в том же регионе, что и клиент.
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Базовая партнерская поддержка включает в себя:
            </Typography>

            <ul>
              <li>начальное обучение по 5-дневному курсу в нашем офисе;</li>
              <li>
                дополнительное консультирование по мере расширения партнерского
                бизнеса и при выпуске новых версий системы (без дополнительных
                финансовых затрат со стороны партнера);
              </li>
              <li>
                юридическую и договорную поддержку для упрощения и
                стандартизации работы партнера со своими клиентами - типовые
                договора, передача положительного опыта и консультирование по
                вопросам лицензирования программного продукта;
              </li>
              <li>
                отлаженные модели сопровождения партнера в ходе дальнейшего
                взаимодействия.
              </li>
            </ul>

            <Typography sx={{ color: "text.secondary" }} my={1}>
              <strong>
                Мы также проводим для партнеров специальные мероприятия
              </strong>
              , в частности семинары для партнеров, включая их в программу
              общероссийских выставок и конференций. На этих мероприятиях
              партнеры общаются друг с другом, знакомятся с опытом коллег и
              единомышленников, узнают новости о системе МЕДИАЛОГ и вносят свои
              предложения по развитию продукта.
              <br />
              Мы также проводим для партнеров специальные мероприятия
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              <strong>
                Нами также осуществляется комплекс общих маркетинговых
                мероприятий по продвижению системы МЕДИАЛОГ
              </strong>
              , которые позволяют привлекать к нашему продукту максимальное
              количество медицинских учреждений и укреплять наши позиции на
              российском рынке. В частности, мы систематично:
            </Typography>

            <ul>
              <li>выступаем спонсорами профильных выставочных мероприятий,</li>
              <li>проводим рекламные кампании в специализированной прессе</li>
            </ul>
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
              Мы предлагаем разные модели сотрудничества
            </Typography>
            <Typography my={1}>
              <strong>
                Чтобы стать партнером по продвижению системы МЕДИАЛОГ не
                обязательно быть большой компанией.
              </strong>{" "}
              Среди наших лучших партнеров есть компактные команды, которые
              успешно выполняют проекты по внедрению нашего продукта в крупных
              медицинских учреждениях.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Партнерская программа предлагает две базовые модели партнерского
              сотрудничества.
            </Typography>

            <ol>
              <li>
                Первая модель связана с получением статуса торгового партнера.
                Торговый партнер не занимается внедрением системы. Его
                деятельность ограничивается продажей лицензий на программные
                модули системы МЕДИАЛОГ.
              </li>
              <li>
                Вторая модель подразумевает наличие в штате партнерской
                организации специалистов по внедрению информационных систем,
                желание и готовность оказывать клиентам услуги, связанные с
                внедрением современного программного комплекса.
              </li>
            </ol>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              <strong>
                {" "}
                Партнер может начать сотрудничество с минимальными вложениями
              </strong>
              , поэтапно повышая партнерский статус по мере развития своего
              бизнеса. Каждая следующая ступень партнерства открывает новые
              возможности для партнерской организации.
              <br />
              <br />
              <strong>
                Каждый партнер, в соответствии со своей специализацией, получает
                новые возможности и преимущества:
              </strong>
            </Typography>

            <ul>
              <li>
                интегратор – индивидуальную систему партнерских скидок, растущих
                пропорционально числу успешных проектов внедрения
              </li>
              <li>
                производитель и вендор аппаратного обеспечения – возможность
                создания и продвижения на рынке отлаженного
                программно-аппаратного комплекса и предложения клиентам типового
                решения «оборудование + приложения»
              </li>
              <li>
                компания-субподрядчик – возможность внедрять гибко настраиваемый
                продукт и обучать пользователей, а также коммерческую поддержку:
                мы предлагаем Ваши услуги нашим клиентам;
              </li>
              <li>
                консалтинговая компания – возможность взаимовыгодного обмена
                опытом и развития экспертизы.
              </li>
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
              Наши партнеры
            </Typography>
            <Typography
              sx={{ color: "text.secondary" }}
              my={1}
              variant="subtitle1"
            >
              Вместе мы делаем полезное дело
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              Внедрение комплексных медицинских систем и автоматизация медицины
              это гораздо больше, чем просто бизнес, - это работа для людей.
              Здесь, как ни в какой другой отрасли, информационные технологии
              помогают конкретным людям и результаты этой помощи видны сразу.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Москва
            </Typography>
            <ul>
              <li>
                <a href="https://www.bkvet.ru" target="_blank">
                  Белый Клык
                </a>
              </li>
              <li>
                <a href="http://www.kampas.ru" target="_blank">
                  КамПАС
                </a>
              </li>
              <li>
                <a href="https://asbccenter.ru" target="_blank">
                  АСБК
                </a>
              </li>
              <li>
                <a href="http://www.tanais.ru" target="_blank">
                  Танаис (TANAiS)
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Санкт-Петербург
            </Typography>
            <ul>
              <li>
                <a href="http://www.itsmb.ru" target="_blank">
                  ИТСМБ
                </a>
              </li>
              <li>
                <a href="http://mit.company" target="_blank">
                  МИТ (MIT)
                </a>
              </li>
              <li>
                <a href="http://nansenproject.ru" target="_blank">
                  Нансен Проджект Центр (Nansen)
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Волгоград
            </Typography>
            <ul>
              <li>
                <a href="https://it-albion.ru" target="_blank">
                  IT Albion
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Екатеринбург
            </Typography>
            <ul>
              <li>
                <a href="http://eamk.pro" target="_blank">
                  ЕАМК Европейско-Азиатская Медицинская Компания
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Самара
            </Typography>
            <ul>
              <li>
                <a href="https://medguard.ru" target="_blank">
                  Медгард
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Краснодар
            </Typography>
            <ul>
              <li>РЦ Гиппократ</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Уфа
            </Typography>
            <ul>
              <li>НТМ </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Новосибирск
            </Typography>
            <ul>
              <li>
                <a href="http://www.medsoftservice.ru" target="_blank">
                  МедСофтСервис{" "}
                </a>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Омск
            </Typography>
            <ul>
              <li>Энергоинвест</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Томск
            </Typography>
            <ul>
              <li>
                <a href="http://itmedsib.ru" target="_blank">
                  ITMEDSIB{" "}
                </a>
              </li>
              <li>
                <a href="https://zapsib.it/" target="_blank">
                  ЗапСиб IT
                </a>
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Хабаровск
            </Typography>
            <ul>
              <li>Альвис </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <BaseCard>
          <Typography variant="h3" my={1} sx={{ color: "primary.dark" }}>
            Учебный центр ПМТ
          </Typography>
          <Typography my={1} sx={{ color: "text.secondary" }}>
            Там Вы можете найти очные и дистанционные учебные курсы для освоения
            медицинской информационной системы МЕДИАЛОГ, подать заявку на
            прохождение курса, получить круглосуточный доступ к материалам,
            задачам и тестам
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            target="_blank"
            href="https://study.medialog.ru"
            sx={{ my: 2 }}
          >
            Посетить учебный центр ПМТ
          </Button>
          <Typography sx={{ color: "text.secondary" }} my={1}>
            По всем вопросам очного и дистанционного обучения просим обращаться
            по электронной почте:{" "}
            <a href="mailto:sales@postmodern.ru">sales@postmodern.ru</a>
          </Typography>
        </BaseCard>
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
