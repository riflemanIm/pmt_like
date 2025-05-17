import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { makeStyles } from '@mui/styles';
import { useLanguageValue, LanguageActonType, LANGUAGES } from '../../context/LanguageContext';
// context
import { useUserState, useUserDispatch, setLanguage } from '../../context/UserContext';

const useStyles = makeStyles((theme: Theme) => ({
  headerMenu: {
    marginTop: theme.spacing(1)
  },

  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  },

  languagesMenu: {
    minWidth: 265
  },
  languagesMenuItem: {
    color: theme.palette.primary.main
  },

  text: {
    textTransform: 'uppercase'
  }
}));

export default function UsersLanguageMenu() {
  const classes = useStyles();
  const { languageState, dispatchLanguage } = useLanguageValue();

  const { userInfo } = useUserState();
  const userDispatch = useUserDispatch();
  const [languagesMenu, setLanguagesMenu] = useState<Element | null>(null);

  const handleOpenMenu = (e: React.MouseEvent) => {
    setLanguagesMenu(e.currentTarget);
  };

  const handleChangeLang = (e: React.MouseEvent, langStatus: string) => {
    setLanguagesMenu(null);
    if (userInfo != null) setLanguage(userDispatch, langStatus);

    switch (langStatus) {
      case LANGUAGES.RU:
        dispatchLanguage({ type: LanguageActonType.SET_RUSSIAN });
        return;
      case LANGUAGES.FR:
        dispatchLanguage({ type: LanguageActonType.SET_FRENCH });
        return;
      case LANGUAGES.EN:
        dispatchLanguage({ type: LanguageActonType.SET_ENGLISH });
        return;
      default:
        dispatchLanguage({ type: LanguageActonType.SET_RUSSIAN });
    }
  };
  return (
    <>
      <IconButton color="inherit" aria-haspopup="true" aria-controls="mail-menu" onClick={handleOpenMenu} sx={{ mx: 1 }}>
        <Typography className={classes.text}>{languageState.language}</Typography>
      </IconButton>

      <Menu
        id="profile-menu"
        open={Boolean(languagesMenu)}
        anchorEl={languagesMenu}
        onClose={() => setLanguagesMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.languagesMenu }}
        disableAutoFocusItem
      >
        {Object.keys(LANGUAGES).map((key) => (
          <MenuItem
            key={key}
            className={classNames(classes.languagesMenuItem, classes.headerMenuItem)}
            onClick={(event) => handleChangeLang(event, LANGUAGES[key])}
          >
            <Typography className={classes.text}>{LANGUAGES[key]}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
