import React from "react";
import { Box, Typography } from "@mui/material";
import { getYearNow } from "../../helpers";

const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center", color: "#fff" }}>
      <Typography>© {getYearNow()} All rights reserved by PMT</Typography>
    </Box>
  );
};

export default Footer;
