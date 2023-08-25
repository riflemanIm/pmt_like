import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  CircularProgress,
  Collapse as Fade,
  TextField as Input,
  OutlinedInput,
  FormHelperText,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Alert,
} from "@mui/material";

// icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

//components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  creatingButtonContainer: {
    marginBottom: theme.spacing(3),

    height: 46,
    display: "flex",
  },
  submitButton: {
    height: 46,
    textTransform: "none",
    minWidth: 200,
    width: "100%",
  },
  errorMessage: {
    //textAlign: 'center',
    marginBottom: theme.spacing(4),
    width: "100%",
  },

  agreementButton: {
    textAlign: "left",
    textTransform: "none",
    fontWeight: 500,
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
}));

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function SignUpForm({
  values,
  errors,
  handleChange,
  serverResponse,
  isLoading,
  handleSubmit,
}) {
  const classes = useStyles();

  const [visibilePass, setVisibilePass] = useState(false);
  const [visibileRePass, setVisibileRePass] = useState(false);

  const authIdentifiers = "email";
  const loginLabel = () => {
    switch (authIdentifiers) {
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
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isConfirmForm =
    serverResponse?.action === "CONFIRM_CODE_SENT" ||
    serverResponse?.action === "WRONG_CONFIRMATION_CODE";

  return (
    <>
      <Fade
        styte={{ width: "100%" }}
        in={serverResponse?.action != null}
        style={
          serverResponse?.action != null
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <Alert
          severity={serverResponse?.action === "OK" ? "success" : "warning"}
          className={classes.errorMessage}
        >
          <Typography variant="body2">
            {serverResponse?.action === "OK"
              ? t("SIGN.UP_OK")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "Email"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_EMAIL")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "Sms"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_SMS")
              : serverResponse?.action === "CONFIRM_CODE_SENT" &&
                serverResponse?.deliveryMethod === "VoiceCall"
              ? t("SIGN.CH_CONFIRM_CODE_SENT_VOICE")
              : serverResponse?.action === "WRONG_LOGIN_OR_PASSWORD"
              ? t("SIGN.UP_WRONG_LOG_OR_PASS")
              : serverResponse?.action === "EMAIL_ALREADY_REGISTERED"
              ? t("SIGN.UP_EMAIL_ALREADY_REG")
              : serverResponse?.action === "MAY_LOGIN"
              ? t("SIGN.UP_MAY_LOGIN")
              : serverResponse?.action === "WRONG_CONFIRMATION_CODE"
              ? t("SIGN.UP_CONFIRM_CODE_WRONG")
              : serverResponse?.action}
          </Typography>
        </Alert>
      </Fade>
      {isConfirmForm ? (
        <>
          <Input
            name="confirmationCode"
            variant="outlined"
            value={values.confirmationCode}
            onChange={handleChange}
            margin="normal"
            label={t("SIGN.UP_CONFIRM_CODE")}
            type="tel"
            fullWidth
            required
            error={errors?.confirmationCode != null}
            helperText={
              errors?.confirmationCode != null && errors?.confirmationCode
            }
          />
          <div className={classes.creatingButtonContainer}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  isEmpty(values.confirmationCode) ||
                  errors.confirmationCode != null
                }
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitButton}
              >
                {t("SIGN.UP_SUBMIT_CONFIRM")}
              </Button>
            )}
          </div>
        </>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={12}>
            <Input
              name="login"
              autoComplete={"off"}
              variant="outlined"
              value={values.login || ""}
              onChange={handleChange}
              label={loginLabel()}
              type="text"
              fullWidth
              required
              error={values.login != null && errors?.login != null}
              helperText={
                values.login != null && errors?.login != null && errors?.login
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                name="password"
                autoComplete="new-password"
                variant="outlined"
                value={values.password || ""}
                onChange={handleChange}
                label="Пароль"
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                {t("COMPONENT.FORM_REPASS")}
              </InputLabel>
              <OutlinedInput
                name="repassword"
                autoComplete="new-password"
                variant="outlined"
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

          <Grid item xs={12} sm={6}>
            <Input
              name="lastName"
              variant="outlined"
              autoComplete={"off"}
              value={values.lastName || ""}
              onChange={handleChange}
              margin="normal"
              label={t("COMPONENT.FORM_LAST_NAME")}
              type="text"
              fullWidth
              inputProps={{ maxLength: 50 }}
              required
              error={errors?.lastName != null}
              helperText={errors?.lastName != null && errors?.lastName}
            />
            <Input
              name="firstName"
              variant="outlined"
              autoComplete={"off"}
              value={values.firstName || ""}
              onChange={handleChange}
              margin="normal"
              label={t("COMPONENT.FORM_NAME")}
              type="text"
              fullWidth
              inputProps={{ maxLength: 50 }}
              required
              error={errors?.firstName != null}
              helperText={errors?.firstName != null && errors?.firstName}
            />
            <Input
              name="middleName"
              variant="outlined"
              autoComplete={"off"}
              value={values.middleName || ""}
              onChange={handleChange}
              margin="normal"
              label={t("COMPONENT.FORM_MIDLE_NAME")}
              type="text"
              fullWidth
              inputProps={{ maxLength: 50 }}
              error={errors?.middleName != null}
              helperText={errors?.middleName != null && errors?.middleName}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  values.login == null ||
                  values.firstName == null ||
                  values.lastName == null ||
                  values.password == null ||
                  values.repassword == null ||
                  values.birthDate == null ||
                  !values.agreement ||
                  !isEmpty(errors)
                }
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitButton}
              >
                {t("SIGN.UP_BUTTON_SUBMIT")}
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default SignUpForm;
