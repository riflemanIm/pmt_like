import React, { useMemo, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField as Input,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  form: { maxWidth: 400, margin: "auto" },
  submitButton: {
    height: 46,
    textTransform: "none",
    width: "100%",
    margin: "24px auto",
  },
  errorMessage: {
    //textAlign: 'center',
    marginBottom: theme.spacing(4),
    width: "100%",
  },
  formButtons: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },

  loginLoader: {
    marginLeft: theme.spacing(4),
  },

  passwordError: {
    color: theme.palette.warning.error,
  },
}));

export default function SignInForm({
  values,
  errors,
  serverResponse,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  const classes = useStyles();

  const authIdentifiers = "email";

  const loginLabel = () => {
    switch (authIdentifiers) {
      case "email": {
        return "Email или логин";
      }
      case "phone": {
        return "Телефон";
      }
      default: {
        return "Email или Телефон";
      }
    }
  };

  const [visibilePass, setVisibilePass] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return useMemo(
    () => (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className={classes.form}
      >
        <Grid item xs={12}>
          <Fade
            in={!!serverResponse}
            style={
              serverResponse == "" ? { display: "none" } : { display: "flex" }
            }
          >
            <Alert severity="error" className={classes.errorMessage}>
              <Typography variant="h6">{serverResponse || "error"}</Typography>
            </Alert>
          </Fade>
          <Input
            name="login"
            variant="outlined"
            value={values.login || ""}
            onChange={handleChange}
            margin="normal"
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

        <Grid item xs={12}>
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              name="password"
              autoComplete="off"
              variant="outlined"
              value={values.password || ""}
              onChange={handleChange}
              label="Пароль"
              type={visibilePass ? "text" : "password"}
              required
              error={errors?.password != null}
              onKeyDown={(e) => {
                if (
                  errors?.password == null &&
                  values.password !== "" &&
                  e.key === "Enter"
                ) {
                  handleSubmit();
                }
              }}
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
            <FormHelperText className={classes.passwordError}>
              {errors?.password != null && errors?.password}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} className={classes.formButtons} textAlign="center">
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <>
              <Button
                disabled={
                  values.login == null ||
                  values.password == null ||
                  !isEmpty(errors)
                }
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
                Войти
              </Button>
              <Button
                color="primary"
                variant="text"
                className={classes.submitButton}
              >
                Регистрация
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    ),

    [values, errors, visibilePass, serverResponse, isLoading]
  );
}