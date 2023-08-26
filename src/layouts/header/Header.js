import React from "react";
//import FeatherIcon from "feather-icons-react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, NoSsr, Toolbar } from "@mui/material";
import LogoIcon from "../logo/LogoIcon";
import PropTypes from "prop-types";
// Dropdown Component
// import SearchDD from "./SearchDD";
import UserMenu from "./UserMenu";
import { useUserStateDispatch } from "../../context/UserContext";
import UsersSign from "./UsersSign";

const Header = ({ sx, customClass, toggleMobileSidebar, position }) => {
  const {
    userState: { isAuthenticated },
  } = useUserStateDispatch();

  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <Box
          ml={3}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
              width: 99,
              height: 45,
            },
          }}
        >
          <LogoIcon />
        </Box>
        <Box flexGrow={1} />
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
            ml: 10,
          }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* ------------ End Menu icon ------------- */}
        <NoSsr>{isAuthenticated ? <UserMenu /> : <UsersSign />}</NoSsr>
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
