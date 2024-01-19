import React from "react";
import Router from "next/router";
import FeatherIcon from "feather-icons-react";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  Button,
  Divider,
  Toolbar,
  Avatar,
} from "@mui/material";
import { useUserStateDispatch } from "../../context/UserContext";

const UserMenu = () => {
  const {
    userState: { user },
    userDispatch,
  } = useUserStateDispatch();
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const logout = () => {
    userDispatch({
      type: "SIGN_OUT_SUCCESS",
      payload: null,
    });
    Router.push("/signout");
  };

  const FRESHDESK_URL_NEW =
    "https://medialog.myfreshworks.com/login/auth/1703779775100?client_id=451979510707337272&redirect_uri=https%3A%2F%2Fmedialog.freshdesk.com%2Ffreshid%2Fcustomer_authorize_callback%3Fhd%3Dsupport.medialog.ru";

  // const FRESHDESK_SHARED_SECRET = "4263f6dfec25ad582a96975db6698c34";
  // const FRESHDESK_BASE_URL = "http://support.medialog.ru/";
  // const timestamp = Math.floor(Date.now() / 1000);
  // const toBeHashed = `${user.name}${FRESHDESK_SHARED_SECRET}${user.email}${timestamp}`;
  // const hash = md5(toBeHashed, FRESHDESK_SHARED_SECRET);
  // const FRESHDESK_URL = `${FRESHDESK_BASE_URL}login/sso/?name=${user.name}&email=${user.email}&timestamp=${timestamp}&hash=${hash}`;

  return (
    <>
      <Toolbar title={user.name}>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
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
                sx={{
                  mx: 2,
                }}
              >
                {user.name}
              </Typography>
              <FeatherIcon icon="chevron-down" width="26" height="26" />
            </Box>
          </Box>
        </Button>
      </Toolbar>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
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
              onClick={handleClose4}
            >
              <ListItemButton color="primary" href="/profile">
                Профиль
              </ListItemButton>
              <ListItemButton color="primary" href="/generate_rescue_license">
                Получение аварийной лицензии
              </ListItemButton>
              <ListItemButton
                color="primary"
                target="_blank"
                href={FRESHDESK_URL_NEW}
              >
                Поддержка
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
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
    </>
  );
};

export default UserMenu;
