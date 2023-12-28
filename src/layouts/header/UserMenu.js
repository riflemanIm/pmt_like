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
    Router.push("/signin");
  };

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
                href={`https://medialog.myfreshworks.com/sp/OIDC/660463218999657074/implicit?state=medialog&id_token=${user.tokenFD}`}
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
