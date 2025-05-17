import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  useLanguageValue,
  LanguageActonType,
  LANGUAGES,
} from "../../context/LanguageContext";

const useStyles = makeStyles(() => ({
  buttonGroupCastom: {
    border: 0,
    width: "100%",
    height: 42,
  },
}));

export default function UsersLanguageButtons() {
  const classes = useStyles();
  const { languageState, dispatchLanguage } = useLanguageValue();
  const handleChangeLang = (e: React.MouseEvent, langStatus: string) => {
    localStorage.setItem("lang", langStatus);
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
    <ToggleButtonGroup
      value={languageState.language}
      exclusive
      onChange={handleChangeLang}
      aria-label="sweetch-langs"
    >
      {Object.keys(LANGUAGES).map((key) => (
        <ToggleButton
          key={key}
          value={LANGUAGES[key]}
          aria-label={LANGUAGES[key]}
          className={classes.buttonGroupCastom}
        >
          <Typography>{LANGUAGES[key]}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
