import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";

import { useRouter } from "next/router";
//import ProfileDD from "../header/ProfileDD";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  let curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Grid container px={1}>
      <Grid xs={6} p={2}>
        <LogoIcon />
      </Grid>
      {/* <Grid xs={6} p={0.5}>
        <ProfileDD />
      </Grid> */}
      <Grid xs={12}>
        <List>
          {Menuitems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleClick(index)}
              href={item.href}
              component={Link}
              sx={{
                mb: 1,
                ...(location === item.href && {
                  color: (theme) => `${theme.palette.text.primary} !important`,
                  backgroundColor: (theme) => theme.palette.action.active,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location === item.href
                      ? (theme) => `${theme.palette.text.primary} !important`
                      : (theme) => theme.palette.primary.dark,
                }}
              >
                <FeatherIcon icon={item.icon} width="20" height="20" />
              </ListItemIcon>

              <ListItemText onClick={onSidebarClose}>{item.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
            left: "top",
            left: "auto",
            backgroundColor: "#fdfdfdd9",
            backdropFilter: "saturate(180%) blur(5px)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
