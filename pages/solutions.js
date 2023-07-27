import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg6.jpg";

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
      <Typography variant="h1" mb={8}>
        Решения
      </Typography>
      <BaseCard>
        Высокое качество лечения и эффективный менеджмент медицинского
        учреждения невозможны без использования единой информационной системы и
        автоматизации бизнес-процессов. Для ключевых участников этих процессов
        мы подготовили комплексные и понятные решения.
      </BaseCard>
      <Typography variant="subtitle2" mt={6} mb={6}>
        Основой наших решений является медицинская информационная система
        Медиалог, разработанная для решения комплекса лечебных и управленческих
        задач, стоящих перед современной поликлиникой и стационаром. Сегодня,
        благодаря многолетнему опыту эксплуатации и развития системы, мы можем
        предложить полнофункциональный комплекс масштабируемых и открытых
        продуктов, созданных в соответствии со следующими принципами.
      </Typography>
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
                <div>
                  Контроль за заполнением медицинской карты и качеством данных
                </div>
              </li>
              <li>
                <div>
                  Продуманные схемы совместимости с бумажным документооборотом,
                  включая штрих-кодирование
                </div>
              </li>
              <li>
                <div>
                  Настраиваемая бизнес-логика направлений и иных сущностей
                </div>
              </li>
              <li>
                <div>Безопасность медицинской информации</div>
              </li>
              <li>
                <div>Специальные настройки для VIP-пациентов</div>
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
