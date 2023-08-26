import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import {
  CircularProgress,
  Collapse as Fade,
  TextField as Input,
  IconButton,
  Grid,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  FormHelperText,
  Alert,
} from "@mui/material";

import { initPasswordChanging, changePassword } from "../../actions/user";

//components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//i18n
import { useTranslation } from "react-i18next";
//form func
import useForm from "../../hooks/useForm";
import {
  validateBoth,
  validateEmail,
  validatePhone,
} from "./validationChangePassword";
import validateConfirmChangePassword from "./validationConfirmChangePassword";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import isEmpty from "../../helpers";
import { useUserStateDispatch } from "../../context/UserContext";

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

  passwordSuccess: {
    color: theme.palette.success.main,
  },
  passwordError: {
    color: theme.palette.warning.error,
  },
  creatingButtonContainer: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function ChangePassword({ valsTab, setValsTab }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    userState: { appInfo },
  } = useUserStateDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState({});
  const [visibilePass, setVisibilePass] = useState(false);
  const [visibileRePass, setVisibileRePass] = useState(false);

  const sendConfirmCode = () =>
    initPasswordChanging(values, setIsLoading, setServerResponse);

  const confirmCodeAndChangePassword = () =>
    changePassword(values, setIsLoading, setServerResponse);
  const isConfirmForm =
    serverResponse?.action === "CONFIRM_CODE_SENT" ||
    serverResponse?.action === "WRONG_CONFIRMATION_CODE";

  //console.log('serverResponse', serverResponse);
  const validateLogin = () => {
    switch (appInfo?.authIdentifiers) {
      case "email": {
        return validateEmail;
      }
      case "phone": {
        return validatePhone;
      }
      default: {
        return validateBoth;
      }
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    isConfirmForm ? confirmCodeAndChangePassword : sendConfirmCode,
    isConfirmForm ? validateConfirmChangePassword : validateLogin(),
    appInfo
  );

  useEffect(() => {
    if (serverResponse?.action === "OK")
      setValsTab({
        activeTabId: 0,
        login: valsTab?.login,
      });
    // else if (serverResponse !== '')
    //   setServerResponse('CONFIRM_CODE_SENT');
  }, [serverResponse?.action]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //console.log('serverResponse', serverResponse);
  const loginLabel = () => {
    switch (appInfo?.authIdentifiers) {
      case "email": {
        return t("COMPONENT.FORM_EMAIL");
      }
      case "phone": {
        return t("COMPONENT.FORM_PHONE");
      }
      default: {
        return t("COMPONENT.FORM_EMAIL_OR_PHONE");
      }
    }
  };
  return (
    <>
      {valsTab?.warningNote != null && (
        <Typography className={classes.errorMessage} variant="h6">
          {t("SIGN.IN_PASS_HAS_BEEN_EXPIRED")}
        </Typography>
      )}
      <Fade
        in={serverResponse?.action || serverResponse?.error != null}
        style={
          serverResponse?.action != null || serverResponse?.error
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <Alert
          severity={serverResponse?.action === "OK" ? "success" : "warning"}
          className={classes.errorMessage}
        >
          <Typography variant="h6">
            {serverResponse?.action === "OK"
              ? t("SIGN.CH_PASS_OK")
              : serverResponse?.action === "ACCOUNT_NOT_FOUND"
              ? t("SIGN.CH_PASS_ACCOUNT_NOT_FOUND")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "Email"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_EMAIL")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "Sms"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_SMS")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "VoiceCall"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_VOICE")
              : serverResponse?.error}
          </Typography>
        </Alert>
      </Fade>

      {serverResponse?.action == null ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Input
              name="login"
              variant="outlined"
              value={values.login || ""}
              onChange={handleChange}
              //onChange={e => console.log("sss", e)}
              margin="normal"
              label={loginLabel()}
              type="text"
              fullWidth
              required
              error={values.login != null && errors?.login != null}
              helperText={
                values.login != null && errors?.login != null && errors?.login
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <div className={classes.creatingButtonContainer}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={values.login == null || !isEmpty(errors)}
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  className={classes.submitButton}
                >
                  {t("SIGN.CH_BUTTON_SUBMIT")}
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      ) : (
        <>
          <Input
            name="confirmationCode"
            autoComplete={"off"}
            variant="outlined"
            value={values.confirmationCode}
            onChange={handleChange}
            margin="normal"
            label={t("SIGN.CH_CONFIRM_CODE")}
            type="tel"
            fullWidth
            required
            error={errors?.confirmationCode != null}
            helperText={
              errors?.confirmationCode != null && errors?.confirmationCode
            }
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("COMPONENT.FORM_PASS")}
                </InputLabel>
                <OutlinedInput
                  name="password"
                  variant="outlined"
                  autoComplete="new-password"
                  value={values.password || ""}
                  onChange={handleChange}
                  label={t("COMPONENT.FORM_PASS")}
                  type={visibilePass ? "text" : "password"}
                  required
                  error={errors?.password != null}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setVisibilePass(!visibilePass)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {!visibilePass ? (
                          <VisibilityOffIcon color="primary" />
                        ) : (
                          <VisibilityIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {!isEmpty(errors?.passRules) &&
                Object.keys(errors?.passRules).map((key) => {
                  const clsName = errors?.passRules[key].valid
                    ? classes.passwordSuccess
                    : classes.passwordError;
                  return (
                    <Grid
                      key={key}
                      container
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Grid item xs={1} style={{ paddingLeft: 8 }}>
                        {errors?.passRules[key].valid ? (
                          <CheckIcon className={clsName} />
                        ) : (
                          <CloseIcon className={clsName} />
                        )}
                      </Grid>
                      <Grid item xs={11} style={{ paddingLeft: 14 }}>
                        <FormHelperText className={clsName}>
                          {errors?.passRules[key].ruleText}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("COMPONENT.FORM_REPASS")}
                </InputLabel>
                <OutlinedInput
                  name="repassword"
                  variant="outlined"
                  autoComplete="new-password"
                  value={values.repassword || ""}
                  onChange={handleChange}
                  label={t("COMPONENT.FORM_REPASS")}
                  type={visibileRePass ? "text" : "password"}
                  required
                  error={errors?.repassword != null}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setVisibileRePass(!visibileRePass)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {!visibileRePass ? (
                          <VisibilityOffIcon color="primary" />
                        ) : (
                          <VisibilityIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.passwordError}>
                  {errors?.repassword != null && errors?.repassword}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <div className={classes.creatingButtonContainer}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  isEmpty(values.confirmationCode) ||
                  values.password == null ||
                  values.repassword == null ||
                  !isEmpty(errors)
                }
                onClick={handleSubmit}
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                className={classes.submitButton}
              >
                {t("SIGN.UP_SUBMIT_CONFIRM")}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ChangePassword;
