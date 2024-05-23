import React from "react";
import { Box, Typography } from "@mui/material";
import { getYearNow } from "../../helpers";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  link: {
    textShadow:
      "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #F6F7F9, 0 0 30px #F6F7F9, 0 0 40px #F6F7F9, 0 0 55px #F6F7F9, 0 0 75px #F6F7F9",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography my={3}>
        <a href="https://reestr.digital.gov.ru/reestr/303659/" target="_blank">
          Реестровая запись №2309 от 15.12.2016 в РПО
        </a>
      </Typography>
      <Typography color="#fff">
        © {getYearNow()} All rights reserved by PMT
      </Typography>
    </Box>
  );
};

export default Footer;
