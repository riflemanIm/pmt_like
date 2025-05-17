import React from "react";
import { Box } from "@mui/material";

const Footer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box
      mt={5}
      width={"100%"}
      display="flex"
      alignItems={"center"}
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
};

export default Footer;
