import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  SxProps,
  Theme,
  Toolbar,
} from "@mui/material";
import AuthSensitive from "layouts/AuthSensitive";
import React from "react";
import { useUserStateDispatch } from "../../context/UserContext";
import LogoIcon from "../logo/LogoIcon";
import UserMenu from "./UserMenu";
import UsersSign from "./UsersSign";

interface HeaderProps {
  sx?: SxProps<Theme>;
  customClass?: string;
  position?: "fixed" | "absolute" | "sticky" | "relative" | "static";
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  sx,
  customClass,
  toggleMobileSidebar,
  position = "static",
}) => {
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
        <AuthSensitive fallback={<UsersSign />}>
          <UserMenu />
        </AuthSensitive>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
