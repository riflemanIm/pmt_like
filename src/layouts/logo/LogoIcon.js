import React from "react";
import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  logoWhite: {
    width: 90,
    height: 45,
    color: "#fff",
    fontSize: "auto",
    fill: "none",
  },
  logoDark: {
    width: 90,
    height: 45,
    fontSize: "auto !important",
    fill: "none !important",
  },

  logoHide: {
    display: "none",
  },
  logoShow: {
    display: "block",
  },
}));

const Logo = () => (
  <SvgIcon
    style={{
      width: 90,
      height: 45,
      fill: "#333333",
    }}
    viewBox="0 0 99 45"
  >
    <path
      d="M477.344,420.09A4.1,4.1,0,0,1,481.4,416a4.234,4.234,0,0,1,4.328,4.09v16.364h7.844V420.09c0-7.636-5.41-11.727-11.631-11.727a9.583,9.583,0,0,0-8.386,4.909h-0.27a10.1,10.1,0,0,0-8.385-4.909c-5.951,0-11.631,4.091-11.631,11.727v16.364h7.844V420.09a4.234,4.234,0,0,1,4.328-4.09,4.172,4.172,0,0,1,4.057,4.09v16.364h7.845V420.09ZM420,446h7.845V434.49a12.577,12.577,0,0,0,7.3,2.782A14.463,14.463,0,1,0,420,422.818V446Zm7.845-23.182a6.762,6.762,0,1,1,6.762,6.818,6.719,6.719,0,0,1-6.762-6.818h0Zm68.434-6.546h5.41v8.182c0,7.909,3.246,12.818,11.09,12.818a16.534,16.534,0,0,0,6.221-1.09v-7.691a9.428,9.428,0,0,1-5.139,1.145c-3.246,0-4.328-2.727-4.328-5.182v-8.182h8.115v-7.09h-8.115V401h-1.353l-11.9,14.181v1.091Z"
      transform="translate(-420 -401)"
    ></path>
  </SvgIcon>
);
const LogoIcon = () => {
  const classes = useStyles();
  return <Logo />;
};

export default LogoIcon;
