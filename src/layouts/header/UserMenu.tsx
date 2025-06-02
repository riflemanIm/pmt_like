"use client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Link,
  List,
  ListItemButton,
  Menu,
  NoSsr,
  Toolbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Router from "next/router";
import React, { MouseEvent, useState } from "react";
import { useUserStateDispatch } from "../../context/UserContext";

const UserMenu: React.FC = () => {
  const {
    userState: { user },
    userDispatch,
  } = useUserStateDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const logout = (): void => {
    userDispatch({
      type: "SIGN_OUT_SUCCESS",
    });
    Router.push("/signout");
  };

  const FRESHDESK_URL_NEW =
    "https://medialog.myfreshworks.com/login/auth/1703779775100?client_id=451979510707337272&redirect_uri=https%3A%2F%2Fmedialog.freshdesk.com%2Ffreshid%2Fcustomer_authorize_callback%3Fhd%3Dsupport.medialog.ru";

  return (
    <NoSsr>
      <Toolbar title={user.name}>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center">
            <Avatar alt={user.name} />
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                fontWeight="500"
                sx={{ mx: 2 }}
              >
                {user.name}
              </Typography>
              <FeatherIcon icon="chevron-down" />
            </Box>
          </Box>
        </Button>
      </Toolbar>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose}
            >
              <ListItemButton color="primary" href="/lk">
                Новости
              </ListItemButton>
              <ListItemButton color="primary" href="/profile">
                Профиль
              </ListItemButton>
              <ListItemButton
                color="primary"
                href="/generate_license?lic=rescue"
              >
                Получение аварийной лицензии
              </ListItemButton>
              <ListItemButton color="primary" href="/generate_license?lic=demo">
                Получение ДЕМО лицензии (для Партнеров)
              </ListItemButton>

              <ListItemButton
                component="a"
                color="primary"
                target="_blank"
                href={FRESHDESK_URL_NEW}
                rel="noopener noreferrer"
              >
                Поддержка
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href="/" underline="none">
              <Button
                onClick={logout}
                fullWidth
                variant="contained"
                color="primary"
              >
                Выход
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </NoSsr>
  );
};

export default UserMenu;
