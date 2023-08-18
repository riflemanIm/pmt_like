import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
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
      <Grid item xs={12} p={2}>
        <LogoIcon />
      </Grid>
      {/* <Grid xs={6} p={0.5}>
        <ProfileDD />
      </Grid> */}
      <Grid item xs={12}>
        <List>
          {Menuitems.map((item, index) => {
            const MuiIcon = item.muiIcon;
            return (
              <ListItem
                key={index}
                onClick={() => handleClick(index)}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : null}
                component={Link}
                sx={{
                  mb: 1,
                  ...(location === item.href
                    ? {
                        color: (theme) =>
                          `${theme.palette.text.main} !important`,
                        backgroundColor: (theme) => theme.palette.action.active,
                      }
                    : {
                        color: (theme) =>
                          `${theme.palette.primary.main} !important`,
                      }),
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location === item.href
                        ? (theme) => `${theme.palette.text.main} !important`
                        : (theme) => `${theme.palette.primary.main} !important`,
                  }}
                >
                  {item.muiIcon != null ? (
                    <MuiIcon />
                  ) : (
                    <FeatherIcon icon={item.icon} width="20" height="20" />
                  )}
                </ListItemIcon>

                <ListItemText onClick={onSidebarClose}>
                  {item.title}
                </ListItemText>
              </ListItem>
            );
          })}
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
