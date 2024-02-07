import React, { useMemo } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  Grid,
  TextField as Input,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    textTransform: "none",
    width: "100%",
    margin: "24px auto",
  },
  errorMessage: {
    //textAlign: 'center',
    marginBottom: theme.spacing(4),
    width: "100%",
  },

  loginLoader: {
    marginLeft: theme.spacing(4),
  },

  passwordError: {
    color: theme.palette.warning.error,
  },
}));

export default function SendPassword({
  values,
  errors,
  serverResponse,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  const classes = useStyles();

  return useMemo(
    () => (
      <Grid
        container
        sx={{
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <Fade
            in={!!serverResponse}
            style={
              serverResponse == null ? { display: "none" } : { display: "flex" }
            }
          >
            <Alert
              severity={serverResponse !== "PASS_SENDED" ? "error" : "success"}
              className={classes.errorMessage}
            >
              <Typography variant="h6">
                {" "}
                {serverResponse === "PASS_SENDED"
                  ? "Пароль выслан Вам на email"
                  : serverResponse === "EMAIL_DOESNT_EXISTS"
                  ? "Такой email не зарагистрирован"
                  : serverResponse}
              </Typography>
            </Alert>
          </Fade>
          <Input
            name="login"
            variant="outlined"
            value={values.login || ""}
            onChange={handleChange}
            margin="normal"
            label="Email или логин"
            type="text"
            fullWidth
            required
            error={values.login != null && errors?.login != null}
            helperText={
              values.login != null && errors?.login != null && errors?.login
            }
          />
        </Grid>

        <Grid item xs={12} my={5} textAlign="center">
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <Button
              disabled={values.login == null || !isEmpty(errors)}
              onClick={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Выслать пароль
            </Button>
          )}
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Button
            color="info"
            variant="text"
            href="/signin"
            className={classes.submitButton}
          >
            Вход
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Button
            color="primary"
            variant="text"
            href="/signup"
            className={classes.submitButton}
          >
            Регистрация
          </Button>
        </Grid>
      </Grid>
    ),

    [values, errors, serverResponse, isLoading]
  );
}
