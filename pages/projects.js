import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg24.jpg";

const Accordion = styled((props) => (
  <MuiAccordion elevation={0} square {...props} />
))();

export default function Projects({ menu }) {
  //console.log("menu", menu);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Основные проекты
      </Typography>
      <BaseCard>
        С помощью МИС МЕДИАЛОГ автоматизировано более 950 медицинских учреждений
        и свыше 25 000 рабочих мест в России и СНГ. Несмотря на то, что наши
        решения занимают лидирующие позиции в автоматизации средних и крупных
        медицинских учреждений, стационаров и сетей, гибкая тарифная политика
        позволяет найти каждому, даже небольшому медицинскому учреждению,
        оптимальную конфигурацию за разумные деньги.
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
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Сеть клиник "МЕДСИ"
            </Typography>

            <Typography sx={{ color: "text.secondary" }} my={1}>
              &#62; 5000 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={3}>
              Сеть включает 13 лечебно-профилактических учреждений в Москве и
              области, 7 клиник в регионах, 76 медицинских пунктов в городах
              России, 3 клинико-диагностических центра, Департамент семейной
              медицины, службу Скорой медицинской помощи, 2 специализированных
              детских клиники, а также педиатрические отделения в клиниках
              Москвы и регионов, 2 клинические больницы, 3 санатория и 3
              фитнес-центра. Компания отмечает среди своих сотрудников 76
              докторов медицинских наук, 432 кандидатов медицинских наук и более
              2 тыс. врачей-специалистов. В 2014 год количество посещений
              увеличилось до 6035,3 тыс. человек.
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
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Перинатальный центр и сеть клиник «Мать и дитя»
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              1500 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              «Мать и дитя» сегодня - это 4 ультрасовременных
              высокотехнологичных госпиталя, 28 клиник, обладающих, мощными
              диагностическими и терапевтическими ресурсами, в 19 городах
              России, более 6000 квалифицированных специалистов, знающих и
              любящих свою работу, уникальный спектр медицинских услуг для всей
              семьи. Компания – лидер в области акушерства, гинекологии и
              педиатрии. № 1 в России по числу циклов ЭКО.
            </Typography>
          </AccordionDetails>
        </Accordion>
        -
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
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Поликлиники ОАО «Газпром»
            </Typography>
            <Typography my={1} sx={{ color: "text.secondary" }}>
              700 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              ОКДЦ ПАО «Газпром» — не только самое крупное лечебное учреждение в
              системе здравоохранения ПАО «Газпром», но и, в силу своего
              высококлассного современного оснащения, наличия квалифицированных
              кадров, применения передовых методов лечения, является
              методической базой для развития амбулаторно-поликлинической помощи
              в лечебных учреждениях дочерних обществ. На базе Центра ежегодно
              проводятся научные симпозиумы и ведомственные научно-практические
              конференции, организуются тематические семинары по актуальным
              вопросам терапии и амбулаторной хирургии, проходят мастер-классы
              по лапароскопическим методам лечения хирургических заболеваний.
              Телекоммуникационные технологии позволяют участникам
              мастер-классов следить за операциями в режиме удаленного доступа.
              В Центре микрохирургии глаза регулярно проходят тематические
              семинары по применению передовых технологий с использованием
              лазерной хирургической аппаратуры, зачастую имеющейся в России в
              единственном экземпляре, с организацией телетрансляции из
              операционных для врачей-офтальмологов городских стационаров и
              зарубежных специалистов.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Клиника ФГБУ ГНЦ ФМБЦ им. А.И. Бурназяна
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              300 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Федеральное государственное бюджетное учреждение «Государственный
              научный центр Российской Федерации – Федеральный медицинский
              биофизический центр имени А.И. Бурназяна» ФМБА России - мощный
              научно-клинический кластер в системе Федерального
              медико-биологического агентства. ФМБЦ является флагманским
              учреждением российского здравоохранения в области биофизики,
              радиационной и ядерной медицины и безопасности, хирургии и
              трансплантологии, нейрохирургии, гематологии, онкологии, урологии
              и андрологии, неврологии и нейрореабилитации, реаниматологии, а
              также современной диагностики заболеваний и инновационных
              биомедицинских технологий.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              НИИ Неотложной детской хирургии и травматологии Л.М. Рошаля
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              200 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Научно-исследовательский институт неотложной детской хирургии и
              травматологии (НИИ НДХиТ) является центральной научно-практической
              городской структурой, осуществляющей диагностическую, лечебную и
              консультативную помощь детскому населению г. Москвы и Московской
              области с неотложной хирургической, травматологической и
              нейрохирургической патологией. В НИИ НДХиТ трудятся
              высококвалифицированные специалисты, владеющие современными
              диагностическими и лечебными методами, при чем помощь будет
              оказана незамедлительно, круглосуточно и бесплатно. Это
              предусмотрено Международной конвенцией по оказанию неотложной
              помощи, а в нашей стране оказание медицинской помощи обеспечено
              средствами обязательного медицинского страхования.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Центральный военный госпиталь и сеть медицинских центров Спецстроя
              России
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              130 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Центральный военный госпиталь ( ФГМУ Медицинский центр при
              Спецстрое России ) является крупным многопрофильным учреждением,
              оснащенным самым современным диагностическим и лечебным
              оборудованием. Отделения: - полостная хирургия; -
              травматологическое отделение; - гнойная хирургия; -
              нейрохирургическое отделение; - урологическое отделение; -
              лор-отделение; - офтальмологическое отделение; - отделение
              челюстно-лицевой хирургии; - гинекологическое отделение; -
              кардиология; - пульмонология; - неврология; - гастроэнтерология; -
              реанимационное отделение с отделением экстракорпоральных методов
              лечения; - отделение лечебной физкультуры; - психиатрия; -
              бароцентр; - физиотерапевтическое отделение.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9bh-content"
            id="panel9bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Федеральные центры сердечно-сосудистой хирургии в г. Пенза, г.
              Хабаровск и г. Челябинск
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              900 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Федеральное государственное бюджетное учреждение «Федеральный
              центр сердечно-сосудистой хирургии» Министерства здравоохранения
              Российской Федерации (г.Челябинск) построен в рамках национального
              проекта «Здоровье» за счет средств федерального бюджета (надземная
              часть Центра, медицинское и технологическое оборудование) и
              бюджета Челябинской области (цокольная часть Центра, коммуникации
              и системы жизнеобеспечения) для оказания высокотехнологичной
              медицинской помощи по профилю «сердечно-сосудистая хирургия»
              жителям Челябинской области и соседних регионов.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10bh-content"
            id="panel10bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Институт хирургии имени А.В. Вишневского
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              260 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Институт расположен в центре Москвы, имеет 350 хирургических коек.
              Ежегодно в нем выполняется до 3500 операций. Сегодня Институт
              хирургии им. А.В. Вишневского, являясь ведущей многопрофильной
              хирургической клиникой страны, оказывает медицинскую помощь по
              основным направлениям хирургии, таким как хирургия органов брюшной
              полости, сосудистая хирургия, кардиохирургия, грудная хирургия,
              гнойная хирургия, лечение термических поражений, урология,
              травматология, пластическая и реконструктивная хирургия. Институт
              оснащен самым современным диагностическим и лечебным
              оборудованием, таким как 64-, 256- мультиспиральные компьютерные
              томографы, 3Т- магнитно-резонансный томограф, хирургический робот
              «Da Vinci» и др. В повседневной практике используются самые
              передовые, по мировым стандартам, методы лечения. В Институте
              хирургии им. А.В.Вишневского работают известные в нашей стране и
              за рубежом специалисты высшей квалификационной категории —
              академики, профессора, доктора, кандидаты медицинских наук — во
              всех областях хирургии, лабораторной и инструментальной
              диагностики.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel11"}
          onChange={handleChange("panel11")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11bh-content"
            id="panel11bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Научный центр акушерства, гинекологии и перинатологии имени В. И.
              Кулакова
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              510 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Центр является ведущим научным, лечебным и учебным учреждением
              России в области акушерства, гинекологии и перинатологии,
              занимающийся проблемами женского и мужского репродуктивного
              здоровья. ФГБУ НЦАГИП имени В.И. Кулакова Минздрава России
              представляет из себя современный научно-исследовательский,
              лечебно-консультативный и производственный Центр, который на
              основе традиций научных школ, тесной связи с фундаментальной и
              прикладной наукой, используя высокие инновационные медицинские
              технологии, обеспечивает качественное и эффективное оказание
              медицинских услуг больным с акушерской, гинекологической,
              эндокринной патологией, по вопросам женского и мужского бесплодия.
              Объединение научных подходов и большого практического опыта
              позволяет также эффективно оказывать любые виды медицинской помощи
              новорожденным детям, в том числе недоношенным и детям родившимся с
              массой тела менее 1000 г; успешно предупреждать или устранять
              неблагоприятные последствия врожденной и перинатальной патологии.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel13"}
          onChange={handleChange("panel13")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel13bh-content"
            id="panel13bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Многопрофильная клиника "ЦЭЛТ"
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              118 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Многопрофильная клиника ЦЭЛТ (Центр Эндохирургии и Литотрипсии)
              активно работает на рынке платных медицинских услуг уже 23 года.
              Подобного опыта успешной деятельности нет практически ни у одной
              многопрофильной частной клиники России. За годы работы нашими
              клиентами стали более 800 тысяч жителей Москвы, России и
              зарубежья, которые получили у нас более 2 миллионов различных
              услуг, от консультаций врача до сложнейших операций. В частности,
              проведено более 100 тысяч операций. Залог качества предоставляемых
              услуг – высочайший уровень профессионализма наших специалистов.
              Постоянной практикой является участие в национальных и зарубежных
              симпозиумах и конференциях, стажировки в лучших медицинских
              учреждениях Европы и США. Среди сотрудников Центра 40 кандидатов
              медицинских наук, 17 докторов медицинских наук, 37 врачей высшей и
              первой категорий, 17 профессоров и 2 академика.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel14"}
          onChange={handleChange("panel14")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel14bh-content"
            id="panel14bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Российско-финская клиника «Скандинавия» и «АВА-Петер»
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              750 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Многопрофильные медицинские центры – это современные клиники,
              оказывающие медицинскую помощь и услуги разного направления.
              Именно таким медицинским центром является компания «АВА-ПЕТЕР»
              (клиники «АВА-ПЕТЕР» и «Скандинавия»), которая работает на рынке
              частной медицины с 1996 года и является крупнейшей медицинской
              компанией на Северо-Западе России. ООО «АВА-ПЕТЕР» входит в состав
              международной сети медицинских клиник AVA, которая принадлежит
              компании Scanfert (Финляндия).
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel15"}
          onChange={handleChange("panel15")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel15bh-content"
            id="panel15bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Сеть медицинских центров Medswiss
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              260 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              MedSwiss – сеть медицинских центров в Москве и Санкт-Петербурге,
              входит в ТОП-10 крупнейших частных медицинских компаний России и
              обслуживает более 100 тысяч пациентов в год. Основным принципом
              работы сети медицинских центров MedSwiss является гарантия
              надежной, своевременной и высокопрофессиональной медицинской
              помощи. Пациенты могут пройти диагностику и получить необходимые
              консультации по лечению и профилактике практически любого
              заболевания.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel16"}
          onChange={handleChange("panel16")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel16bh-content"
            id="panel16bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Федеральный центр травматологии, ортопедии и эндопротезирования
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              200 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Федеральное государственное бюджетное учреждение "Федеральный
              центр травматологии, ортопедии и эндопротезирования" Министерства
              здравоохранения Российской Федерации (г.Чебоксары) -
              высокоспециализированное учреждение для оказания
              высокотехнологичной медицинской помощи
              травматолого-ортопедического профиля, оснащенное современным
              медицинским оборудованием по мировым стандартам, имеющее большой
              кадровый потенциал. Центр способен решать широкий круг вопросов по
              диагностике и лечению заболеваний опорно-двигательной системы, как
              у взрослых пациентов, так и детей.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel17"}
          onChange={handleChange("panel17")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel17bh-content"
            id="panel17bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Сеть клиник "Ниармедик"
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              304 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Клиники в Москве НИАРМЕДИК - это сеть многопрофильных лечебных
              учреждений с опытным и внимательным персоналом, современным
              оборудованием. Клиники в Москве НИАРМЕДИК оказывают полный
              комплекс медицинских услуг по диагностике, лечению и профилактике
              различных заболеваний. Сеть клиник в Москве НИАРМЕДИК, помимо
              традиционно сильных направлений гинекологии, урологии,
              дерматовенерологии и иммунологии, оказывает полный комплекс
              медицинских услуг по лечению и профилактике заболеваний в
              различных областях медицины, таких как терапия, педиатрия,
              кардиология, гастроэнтерология, эндокринология, проктология,
              травматология и ортопедия, хирургия, офтальмология,
              оториноларингология, стоматология, косметология и эстетическая
              медицина. Многопрофильный городской медицинский центр на
              Полежаевской и Китай-городе дает возможность лечения в
              стационарных условиях. На сегодняшний день сеть медицинских
              центров НИАРМЕДИК включает в себя 13 многопрофильных медицинских
              клиник (11 – в Москве и 2 за пределами Москвы – в Рязани и
              Обнинске). Каждый медицинский центр из сети клиник НИАРМЕДИК
              оказывает полный комплекс медицинских услуг по диагностике,
              лечению и профилактике различных заболеваний.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel18"}
          onChange={handleChange("panel18")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18bh-content"
            id="panel18bh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Европейский медицинский центр "УГМК-Здоровье
            </Typography>
            <Typography sx={{ color: "text.secondary" }} my={1}>
              315 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography my={1}>
              Европейский медицинский центр — частная многопрофильная клиника.
              Высокий заявленный статус обязывает обеспечить соответствующее
              высокое качество обслуживания во всех направлениях — в
              диагностике, лечении и пребывании. Для достижения европейских
              медицинских стандартов лечебный процесс в нашей клинике
              организован по принципу: «Врач идет к больному», палаты оснащены
              на мировом уровне, а врачебный персонал подобран из лучших
              специалистов в своих направлениях.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panelSibGMU"}
          onChange={handleChange("panelSibGMU")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panelSibGMUbh-content"
            id="panelSibGMUbh-header"
          >
            <Typography
              variant="h5"
              my={1}
              sx={{ width: "80%", flexShrink: 0 }}
            >
              Сибирский государственный медицинский университет.
            </Typography>

            <Typography sx={{ color: "text.secondary" }} my={1}>
              270 рабочих мест
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={3}>
              СибГМУ - крупный научно-образовательный и клинический комплекс,
              включающий в себя 4 факультета и 1 институт, где обучаются более 7
              500 студентов из 61 региона России и 39 стран.
              Профессорско-преподавательский состав университета на 80% состоит
              из специалистов, имеющих ученые степени и звания. У студентов
              СибГМУ есть уникальная возможность проходить обучение и практику
              на базе собственных многопрофильных клиник, где ежегодно получают
              медицинскую помощь более 100 тыс. пациентов со всей России.
              Профессиональный состав врачей клиник СибГМУ уникален – среди них
              работают профессора, доктора и кандидаты медицинских наук. Клиники
              оснащены всем необходимым современным оборудованием:
              сверхсовременный 128-срезовый компьютерный томограф, МРТ,
              гамма-камера, эндоскопические и УЗИ комплексы и многим другим.
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
