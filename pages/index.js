import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg25.jpg";
import { css } from "@emotion/css";
import { useMediaQuery } from "@mui/material";
import { sign } from "jsonwebtoken";
import fs from "fs";
import { getYearCompany } from "../src/helpers";
// import axios from "axios";
// import { getParam } from "../src/helpers";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Index({ menu }) {
  //console.log("menu", menu);
  //console.log("process.env", process.env);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Решения
      </Typography>
      {!isMobile && (
        <div
          className={css`
            position: absolute;
            top: 108px;
            left: 77vw;
            z-index: 1;
            width: 251px;
            height: 251px;
            border-radius: 100%;
            background-color: #5f5c93;
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
              {getYearCompany()}
            </Typography>
            <Typography variant="body2" mt={2} sx={{ color: "#fff" }}>
              Компания основана в 1999 году.
            </Typography>
          </div>
        </div>
      )}
      <BaseCard>
        <Typography variant="h6" mb={6}>
          Высокое качество лечения и эффективный менеджмент медицинского
          учреждения невозможны без использования единой информационной системы
          и автоматизации бизнес-процессов. Для ключевых участников этих
          процессов мы подготовили комплексные и понятные решения.
        </Typography>
        Основой наших решений является медицинская информационная система
        <strong> Медиалог</strong>, разработанная для решения комплекса лечебных
        и управленческих задач, стоящих перед современной поликлиникой и
        стационаром. Сегодня, благодаря многолетнему опыту эксплуатации и
        развития системы, мы можем предложить полнофункциональный комплекс
        масштабируемых и открытых продуктов, созданных в соответствии со
        следующими принципами.
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
              Для руководителя
            </Typography>
            {expanded !== "panel1" && (
              <ul>
                <li>Универсальность продуктов и решений</li>
                <li>Эффективность управления</li>
                <li>Прозрачность происходящего в клинике</li>
                <li>Открытость и доступность технологий</li>
              </ul>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h4">Универсальность</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Электронная медицинская карта
            </Typography>

            <ul>
              <li>
                Контроль за заполнением медицинской карты и качеством данных
              </li>
              <li>
                Продуманные схемы совместимости с бумажным документооборотом,
                включая штрих-кодирование
              </li>
              <li>Настраиваемая бизнес-логика направлений и иных сущностей</li>
              <li>Безопасность медицинской информации</li>
              <li>Специальные настройки для VIP-пациентов</li>
            </ul>

            <Typography variant="h4">Управление</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Управление потоками пациентов
            </Typography>

            <ul>
              <li>
                Возможность конфигурирования бизнес-процессов обслуживания
                пациентов
              </li>
              <li>
                Алгоритмизация управления потоками экстренной и плановой
                медицинской помощи
              </li>
              <li>Интеграция с общегородскими службами скорой помощи</li>
              <li>
                Мониторы приемного отделения: оперативность и качество оказания
                медпомощи, данные для оптимизации процессов.
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Планирование ресурсов
            </Typography>

            <ul>
              <li>Расписание работы врачей, кабинетов, приборов</li>
              <li>Аналитика по плановой и фактической загрузке</li>
              <li>Удаленная запись на прием через инфоматы и интернет</li>
              <li>
                Поддержка работы единого колл-центра и диспетчерского пункта
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Отчетность и статистика
            </Typography>
            <ul>
              <li>
                Готовые отчетные формы, в том числе государственные и отраслевые
              </li>
              <li>Анализ себестоимости и затрат на основе МЭС</li>
              <li>
                Оперативное формирование статистических показателей по ЛПУ
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              BI - решение для руководителя
            </Typography>
            <ul>
              <li>«Пульс» клиники на мобильном устройстве</li>
              <li>Укрупненные показатели и подробные отчеты</li>
              <li>Динамика и отклонения от нормы, сравнительный анализ</li>
            </ul>

            <Typography variant="h4">Прозрачность</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Стандарты лечения
            </Typography>
            <ul>
              <li>Контроль качества лечения</li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Складской учет
            </Typography>
            <ul>
              <li>Персонифицированный учет</li>
              <li>Учет затрат по услугам</li>
              <li>Контроль заявок: от подразделения до поставщика</li>
              <li>Полный документооборот складского учета</li>
              <li>Общий цикл движения по подразделениям</li>
              <li>Штрих-кодирование</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Финансы
            </Typography>
            <ul>
              <li>Общая аналитика по финансовым показателям</li>
              <li>Расчеты по ДМС, ОМС, ВМП, платным услугам</li>
              <li>Интеграция с регистрами фондов ОМС</li>
              <li>Аналитика по среднему чеку</li>
              <li>Расчет себестоимости</li>
              <li>Учет нормативных затрат</li>
              <li>
                Поддержка разных типов договоров: фактовый, предоплатный,
                депозитный, авансовый, сетевой и пр.
              </li>
              <li>Контроль допустимости оказания услуг</li>
              <li>Кассовый модуль</li>
              <li>Программы лояльности</li>
              <li>Готовая интеграция с популярными бухгалтерскими системами</li>
              <li>Расчет заработной платы</li>
              <li>Система управления скидками</li>
            </ul>

            <Typography variant="h4">Открытость</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Филиалы и сети
            </Typography>
            <ul>
              <li>Единая или распределенная система</li>
              <li>Сетевые договора с контролем ограничений</li>
              <li>Централизованное расписание для сети клиник</li>
              <li>Единая отчетность</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Разработка собственных решений
            </Typography>
            <ul>
              <li>
                Возможность самостоятельного развития своей уникальной
                конфигурации
              </li>
              <li>Снижение временных и денежных затрат на развитие системы</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Интеграционные сервисы
            </Typography>
            <ul>
              <li>Федеральные сервисы</li>
              <li>Региональные шины</li>
              <li>Ведущие внешние лаборатории</li>
              <li>Приборы персонального мониторинга</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Мобимед - личный кабинет пациента
            </Typography>
            <ul>
              <li>Повышение лояльности пациентов</li>
              <li>Легкость проведения рекламных акций</li>
              <li>Дополнительный источник потока пациентов</li>
              <li>
                Мобильное приложение для пациентов, брендированное под Вашу
                клинику
              </li>
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
            <Typography
              variant="h3"
              my={1}
              sx={{ color: "info.main", width: "45%", flexShrink: 0 }}
            >
              Для врача
            </Typography>
            {expanded !== "panel2" && (
              <ul>
                <li>Помощь в лечении</li>
                <li>Качественная организация процессов</li>
                <li>Прозрачность происходящего в клинике</li>
                <li>Простая адаптация</li>
              </ul>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h4">Лечение</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Электронная медицинская карта
            </Typography>

            <ul>
              <li>
                Рабочие столы и процессы, соответствующие 120 врачебным
                специальностям - опыт внедрений в сотнях ведущих медучреждений
                страны
              </li>
              <li>
                Специальные интерфейсы для различных ролей неврачебного
                персонала
              </li>
              <li>Профильные настройки и сценарии: от кардиохирургии до ЭКО</li>
              <li>Прикрепление изображений с приборов</li>
              <li>
                Контекстные справочники, шаблоны и сценарии автоматического
                заполнения для быстрого ввода данных
              </li>
              <li>Контроль совместимости назначаемых препаратов (VIDAL)</li>
              <li>Проверка орфографии</li>
            </ul>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Стандарты лечения
            </Typography>
            <ul>
              <li>
                Возможность использования федеральных стандартов и разработки
                собственных
              </li>
            </ul>

            <Typography variant="h4">Процессы</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Управление потоками пациентов
            </Typography>

            <ul>
              <li>Быстрый вызов ЭМК ранее осмотренного пациента.</li>
              <li>Настраиваемая форма поиска пациента.</li>
              <li>
                Выполнение ряда действий при работе со списком пациентов без
                открытия ЭМК
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Лабораторная информационная система
            </Typography>

            <ul>
              <li>
                Полностью настраиваемый цикл работы с лабораторными
                исследованиями: от направления до получения результатов в карту
                и визирования врачом
              </li>
              <li>Различные способы визуализации данных</li>
              <li>Сквозное штрих-кодирование</li>
              <li>Контроль качества лабораторной диагностики</li>
              <li>Гибкая настройка методик</li>
              <li>Лабораторные журналы</li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Складской учет
            </Typography>
            <ul>
              <li>
                Интеграция с листом назначений электронной медицинской карты
              </li>
              <li>Экстемпоральная рецептура</li>
              <li>Персональные составы затрат на уровне пользователя</li>
              <li>
                Резервирование медикаментов и аптечных товаров за пациентом
              </li>
              <li>
                Возможность создания склада или места хранения на уровне
                рабочего места или пользователя
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Филиалы и сети
            </Typography>
            <ul>
              <li>Настройка доступных филиалов в типовых направлениях</li>
              <li>Расписание филиальной сети</li>
            </ul>

            <Typography variant="h4">Прозрачность</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Финансы
            </Typography>
            <ul>
              <li>Учет услуг, оказанных врачом</li>
              <li>Мониторинг динамической части заработной платы</li>
              <li>Контроль допустимости и условий оказания услуг</li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Планирование ресурсов
            </Typography>
            <ul>
              <li>Расписание врача</li>
              <li>План приемов для пациента (например, при диспансеризации)</li>
              <li>Автоматическая запись на серию приемов</li>
              <li>
                Формирование групп пациентов и специального расписания группы,
                стоп-листы
              </li>
              <li>
                Быстрый доступ к расписаниям других специалистов, кабинетов,
                приборов
              </li>
              <li>Планирование операций, формирование бригад</li>
            </ul>

            <Typography variant="h4">Адаптация</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Разработка собственных решений
            </Typography>
            <ul>
              <li>
                Быстрое решение оперативных задач, связанных с интерфейсом
                системы и процессом лечения
              </li>
              <li>
                Возможность реализации авторских врачебных методик штатными
                средствами настройки системы
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
              sx={{ color: "success.main", width: "45%", flexShrink: 0 }}
            >
              Для ИТ-специалиста
            </Typography>
            {expanded !== "panel3" && (
              <ul>
                <li>Контроль</li>
                <li>Универсальность</li>
                <li>Экономия времени</li>
                <li>Открытость</li>
                <li>Масштабируемость</li>
              </ul>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h4">Контроль</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Электронная медицинская карта
            </Typography>

            <ul>
              <li>
                Контроли на уровне экранных форм и таблиц: легкая реализация
                сценариев и защита от некорректного ввода{" "}
              </li>
              <li>Ролевые и индивидуальные настройки доступа</li>
              <li>Служба поиска и объединения дубликатов</li>
              <li>Ограничение доступа по группам ЭМК</li>
              <li>Фиксация действий пользователя</li>
              <li>Поддержка ЭЦП</li>
            </ul>

            <Typography variant="h4">Универсальность</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Складской учет
            </Typography>

            <ul>
              <li>
                Встроенный складской модуль, учитывающий отраслевую специфику:
                отсутствие необходимости сложной интеграции и адаптации
              </li>
              <li>
                При необходимости - регулируемый объем интеграции с имеющимися
                учетными системами
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Финансы
            </Typography>

            <ul>
              <li>Готовый модуль импорта прикреплений от страховых компаний</li>
              <li>
                Кассовый модуль: отсутствие необходимости вести кассу в другом
                приложении и сложной синхронизации данных
              </li>
              <li>
                Регулируемый объем и направления обмена данными в рамках готовой
                интеграции с популярными бухгалтерскими системами
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              BI-решение для руководителя
            </Typography>

            <ul>
              <li>Готовая поддержка всех мобильных платформ</li>
              <li>
                Возможность быстрой адаптации используемых в ЛПУ отчетов под
                мобильный интерфейс
              </li>
            </ul>

            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              Мобимед - личный кабинет пациента
            </Typography>

            <ul>
              <li>Готовый личный кабинет</li>
              <li>Возможность встраивания в сайт или использования API</li>
              <li>
                Продуманная архитектура для безопасности и снижения нагрузки на
                базу
              </li>
              <li>Готовое и полностью интегрированное мобильное приложение</li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;

  if (context.req?.cookies?.user == null && query.nonce)
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };

  if (context.req?.cookies?.user == null) return { props: {} };

  const user = JSON.parse(context.req?.cookies?.user);

  //console.log("context.req?.cookies?.user", context.req?.cookies?.user);

  if (query.nonce && user.email) {
    const toDate = new Date().getTime();

    const payload = {
      sub: `${user.id}`,
      iat: toDate,
      nonce: query.nonce,
      email: user.email,
      name: user.name,
    };

    try {
      const privateKey = fs.readFileSync("./data/jwtRS256.key");
      const id_token = sign(payload, privateKey, {
        expiresIn: "31d",
        algorithm: "RS256",
        allowInsecureKeySizes: true,
      });

      const redirectUrl = `${query.redirect_uri}?state=${query.state}&nonce=${query.nonce}&id_token=${id_token}&client_id=${query.client_id}`;

      //console.log("redirectUrl", redirectUrl);
      return {
        redirect: {
          permanent: false,
          destination: redirectUrl,
        },
      };
    } catch (error) {
      console.log("error", error);
    }
  }

  return { props: { ok: "ok" } };
}
