import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { getYearNow } from "../../helpers";

const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography my={3}>
        <Link
          href="https://reestr.digital.gov.ru/reestr/303659/"
          target="_blank"
          sx={(theme) => ({
            color: `${theme.palette.primary.dark} !important`,
            textDecoration: "none !important",
          })}
        >
          Реестровая запись №2309 от 15.12.2016 в РПО
        </Link>
      </Typography>
      <Typography color="#fff">
        © {getYearNow()} All rights reserved by PMT
      </Typography>
    </Box>
  );
};

export default Footer;
