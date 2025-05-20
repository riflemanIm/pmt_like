import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import FullLayout from "../src/layouts/FullLayout";
import BaseCard from "../src/components/baseCard/BaseCard";
import img from "../assets/images/bg/bg20.jpg";
import { css } from "@emotion/css";
import { Button, Grid, Stack, useMediaQuery } from "@mui/material";
import { getYearCompany } from "../src/helpers";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Modale from "../src/components/Modals/Modale";
import PdfView from "../src/components/PdfViewer";

export default function Solution({ menu }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [modal, setModal] = useState({
    open: false,
    url: null,
    title: null,
    type: null,
    error: null,
  });

  const toggleModal = useCallback(
    (params) => {
      const { url, title, type, error } = { ...(params || {}) };
      setModal({
        open: !modal.open,
        url,
        title,
        type: type != null ? type.toLowerCase() : "",
        error,
      });
    },
    [modal.open]
  );

  return (
    <FullLayout img={img.src}>
      {!isMobile && (
        <div
          className={css`
            position: absolute;
            top: 628px;
            left: 75vw;
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
              {getYearCompany()}
            </Typography>
            <Typography variant="body2" mt={2} sx={{ color: "#fff" }}>
              Компания основана в 1999 году.
            </Typography>
          </div>
        </div>
      )}
      <Typography variant="h1" mb={8}>
        О компании
      </Typography>
      <BaseCard>
        <Typography variant="h6">
          Компания «Пост Модерн Текнолоджи» (ПМТ) работает на рынке
          информационных технологий свыше 18 лет и в настоящий момент
          осуществляет свою деятельность на территории Европы, России и стран
          СНГ. ПМТ является одним из крупнейших разработчиков медицинских
          информационных систем (МИС) на территории РФ{" "}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }} mt={3}>
          Компания является сертифицированным партнером компании{" "}
          <strong> Microsoft</strong>, поддерживает отношения с крупными
          ИТ-корпорациями среди которых{" "}
          <strong> CISCO Systems, Philips, Agfa, Zebra Technologies. </strong>
        </Typography>
        <Typography mt={3}>
          Компания имеет уникальный опыт реализации сложных проектов в области
          автоматизации медицинских инфраструктур любого масштаба. МИС
          «Медиалог», ключевой продукт компании, представляет собой комплексную
          медицинскую информационную систему, позволяющую автоматизировать
          деятельность лечебно-профилактических учреждений (ЛПУ) различных
          профилей, масштабов и специализаций. Данная система имеет в
          совокупности <strong> свыше 900 </strong> внедрений в крупных и
          средних ЛПУ России <strong> (более 25 000 рабочих мест) </strong> и
          используется в более чем <strong> 500 ЛПУ Франции </strong> .
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
          <Grid item md={3} sm={6} xs={12}>
            ГКБ им. С.П.&nbsp;Боткина (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            НИИ Неотложной детской хирургии и&nbsp;травмотологии
            Л.М.&nbsp;Рошаля (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Морозовская ДГКБ (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Поликлиники ОАО "Газпром" (Москва, Санкт-Петербург)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Центральная поликлиника ОАО "РЖД" (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            ФМБЦ им. А.И.&nbsp;Бурназяна ФМБА России (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            ФЦ Ортопедии и травматологии (Чебоксары)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            ФЦ Сердечно-сосудистой хирургии (Пенза)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            НИИ Патологии кровообращения им. Е.Н.&nbsp;Мешалкина (Новосибирск)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            НИИ Травматологии и ортопедии (Нижний Новгород)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Институт хирургии им. А.В.&nbsp;Вишневского (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Центральный военный госпиталь и сеть медицинских центров Спецстроя
            России (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            НЦАГиП им. В.И.&nbsp;Кулакова (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Благотворительный центр женского здоровья "Белая Роза" (Москва)
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            Сети клиник "Медси", "Мать и Дитя", "АВА-Петер", "Ниармедик",
            "Чайка", "Medswiss"
          </Grid>
        </Grid>
        <Typography mt={6}>
          В рамках «Программы модернизации здравоохранения субъектов РФ 2012»
          реализованы проекты по разработке и внедрению Единой медицинской
          информационной системы, построенной на базе РМИС «Медиалог» в
          следующих областях: Курская, Мурманская, Амурская, Магаданская,
          Тверская, Хабаровский край.
        </Typography>
      </BaseCard>

      <BaseCard
        title="Политика обработки персональных данных"
        style={{ marginTop: 24 }}
      >
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={() =>
              toggleModal({
                url: "/docs/person_data_pmt_policy.pdf",
                title: "Политика обработки персональных данных",
                type: ".pdf",
              })
            }
          >
            Посмотреть
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadForOfflineIcon />}
            content="a"
            href="/docs/person_data_pmt_policy.pdf"
            target="_blank"
            download="Политика обработки персональных данных"
          >
            Скачать
          </Button>
        </Stack>
      </BaseCard>
      <Modale
        open={modal.open}
        toggleModal={toggleModal}
        title={modal.title}
        height={720}
      >
        <PdfView url={modal.url} />
      </Modale>
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
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, postData1);
//   const menu = await res.json();

//   return { props: { menu } };
// }
