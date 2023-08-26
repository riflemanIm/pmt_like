import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  CircularProgress,
  TextField as Input,
  Collapse as Fade,
  Alert,
} from "@mui/material";

// context
import { useUserStateDispatch } from "../../context/UserContext";

import { confirmLogin } from "../../actions/user";

//components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//form func
import useForm from "../../hooks/useForm";
import validate from "./validationSignInCode";

//i18n
import { useTranslation } from "react-i18next";
import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    textTransform: "none",
  },
  errorMessage: {
    //textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function SignInConfirm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    userState: {
      user: { lang },
      appInfo,
    },
    userDispatch,
  } = useUserStateDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const confirm = () =>
    confirmLogin(
      userDispatch,
      values.code,
      navigate,
      setIsLoading,
      setServerResponse,
      lang
    );

  const { values, errors, handleChange, handleSubmit } = useForm(
    confirm,
    validate,
    appInfo
  );

  return isLoading ? (
    <CircularProgress size={26} className={classes.loginLoader} />
  ) : (
    <>
      <Fade
        in={!!serverResponse}
        style={
          serverResponse == null ? { display: "none" } : { display: "flex" }
        }
      >
        <Alert severity="error" className={classes.errorMessage}>
          <Typography variant="h6">{serverResponse}</Typography>
        </Alert>
      </Fade>
      <Input
        name="code"
        variant="outlined"
        value={values.code}
        onChange={handleChange}
        margin="normal"
        label={t("COMPONENT.CONFIRM_CODE")}
        type="code"
        fullWidth
        required
        error={errors?.code != null}
        helperText={errors?.code != null && errors?.code}
      />
      <div className={classes.formButtons}>
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          disabled={isEmpty(values.code)}
          onClick={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          {t("SIGN.IN_BUTTON")}
        </Button>
      </div>
    </>
  );
}

export default SignInConfirm;
