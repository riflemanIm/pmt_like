import React, { useState, useEffect } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Box,
  Stack,
  Badge,
} from "@mui/material";

import { styled, useTheme, Theme } from "@mui/material/styles";

import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
} from "@mui/icons-material";

// styles
import useStyles from "./styles";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import {
  useUserDispatch,
  useUserState,
  signOut,
} from "../../context/UserContext";
import UsersLanguageMenu from "./UsersLanguageMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  left: 0,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface HaderProps {
  navigate: NavigateFunction;
  hasSideBar: boolean;
}

export default function Header(props: HaderProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const { t } = useTranslation();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();

  // local
  const [isSmall, setSmall] = useState(false);

  const { userPhoto, userInfo } = useUserState();

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;
    setSmall(isSmallScreen);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar position="fixed">
        <Toolbar
          className={classes.toolbar}
          sx={{
            backgroundColor: "inherit",
            minWidth: "100vw",
            mx: { xs: -0.75, sm: -1.5 },
          }}
        >
          {props.hasSideBar && (
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                mr: 1,
              }}
            >
              <Tooltip
                title={`${t(
                  layoutState.isSidebarOpened
                    ? "HEADER.CollapseMenu"
                    : "HEADER.ExpandMenu"
                )}`}
                enterDelay={1000}
              >
                <div>
                  <IconButton
                    aria-label={`${
                      layoutState.isSidebarOpened ? "Colappse" : "Expand"
                    } navigation menu`}
                    color="inherit"
                    onClick={() => toggleSidebar(layoutDispatch)}
                  >
                    {(!layoutState.isSidebarOpened && isSmall) ||
                    (layoutState.isSidebarOpened && !isSmall) ? (
                      <MenuOpenIcon />
                    ) : (
                      <MenuIcon />
                    )}
                  </IconButton>
                </div>
              </Tooltip>
            </Box>
          )}
          <Box
            sx={{
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
            }}
          >
            <Stack direction="row" alignItems="center">
              <Link
                to="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: theme.spacing(2.5),
                  marginRight: theme.spacing(2.5),
                }}
              >
                {layoutState.version ? (
                  <Badge
                    badgeContent={`v${layoutState.version}`}
                    color="primary"
                  >
                    <Typography variant="h6" className={classes.logotype}>
                      Mobimed admin
                    </Typography>
                  </Badge>
                ) : (
                  <Typography variant="h6" className={classes.logotype}>
                    Mobimed admin
                  </Typography>
                )}
              </Link>
              <UsersLanguageMenu />
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {userInfo && (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                aria-controls="profile-menu"
              >
                <Avatar
                  alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                  src={userPhoto}
                />
              </IconButton>
              <Typography
                component="div"
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                  marginRight: "8px !important",
                }}
              >
                <Typography variant="body2">
                  {userInfo?.firstName} {userInfo?.lastName}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                  marginRight: "8px !important",
                  textDecoration: "none",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => signOut(userDispatch, props.navigate)}
              >
                {t("SIGN.SIGNOUT")}
              </Typography>
            </Stack>
          )}
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
