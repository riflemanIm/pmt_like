import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
//components
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
  Select,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";

//import InputMask from "react-input-mask";
// icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  creatingButtonContainer: {
    marginBottom: theme.spacing(3),
    display: "flex",
  },
  submitButton: {
    textTransform: "none",
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
  setValues,
  setErrors,
  validate,
  handleChange,
  handleSubmit,
  serverResponse,
  isLoading,
  countries,
  beginigText = "Пожалуйста заполните форму регистрации",
}) {
  const classes = useStyles();

  const [visibilePass, setVisibilePass] = useState(false);
  const [visibileRePass, setVisibileRePass] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handlePhoneChange = (e) => {
  //   const vals = {
  //     ...values,
  //     phone: e.target.value,
  //   };
  //   setValues(vals);
  //   setErrors(validate(vals));
  // };
  const handleChangeCountry = (event) => {
    const vals = {
      ...values,
      country_id: event.target.value,
    };
    setValues(vals);
    setErrors(validate(vals));
  };
  const disabled =
    !isEmpty(errors) ||
    values.email == null ||
    values.name == null ||
    (values.password == null && values.id == null) ||
    values.phone == null ||
    values.company == null ||
    values.town == null ||
    values.address == null;

  console.log("values", values);
  console.log("errors", errors);

  return (
    <>
      <Fade
        styte={{ width: "100%" }}
        in={true}
        // style={
        //   serverResponse != null ? { display: "flex" } : { display: "none" }
        // }
      >
        <Alert
          severity={
            serverResponse === "SUCCESS_CREATE" ||
            serverResponse === "SUCCESS_UPDATE"
              ? "success"
              : serverResponse == null
              ? "info"
              : "warning"
          }
          className={classes.errorMessage}
        >
          <Typography variant="body2">
            {serverResponse === "SUCCESS_CREATE"
              ? "Вы успешно зарегистрировались"
              : serverResponse === "SUCCESS_UPDATE"
              ? "Данные успешно изменены"
              : serverResponse === "SOMETHING_WRONG"
              ? "Что то пошло не так, попробуйте еще раз"
              : serverResponse === "EMAIL_EXISTS"
              ? "Такой email  уже зарегистрирован у нас, пожалуйста попробуйте другой"
              : serverResponse == null
              ? beginigText
              : serverResponse}
          </Typography>
        </Alert>
      </Fade>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Input
            name="email"
            autoComplete={"off"}
            variant="outlined"
            value={values.email || ""}
            onChange={handleChange}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            error={values.email != null && errors?.email != null}
            helperText={
              values.email != null && errors?.email != null && errors?.email
            }
          />
        </Grid>
        {values.id == null && (
          <>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth margin="normal">
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
                {!isEmpty(errors?.passRules) && (
                  <FormHelperText
                    className={classes.passwordError}
                    sx={{ mb: 1, fontWeight: 500, color: "error.main" }}
                  >
                    Пароль должен содержать:
                  </FormHelperText>
                )}
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

            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor="outlined-adornment-password">
                  Повторите Ваш пароль
                </InputLabel>
                <OutlinedInput
                  name="repassword"
                  autoComplete="new-password"
                  variant="outlined"
                  value={values.repassword || ""}
                  onChange={handleChange}
                  label="Повторите Ваш пароль"
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
          </>
        )}
        <Grid item xs={12} sm={values.id == null ? 6 : 4}>
          <Input
            name="name"
            variant="outlined"
            autoComplete={"off"}
            value={values.name || ""}
            onChange={handleChange}
            margin="normal"
            label="Имя"
            type="text"
            fullWidth
            inputProps={{ maxLength: 50 }}
            required
            error={errors?.name != null}
            helperText={errors?.name != null && errors?.name}
          />
        </Grid>

        <Grid item xs={12} sm={values.id == null ? 6 : 4}>
          <Input
            name="phone"
            variant="outlined"
            value={values?.phone || ""}
            onChange={handleChange}
            margin="normal"
            label="Телефон"
            type="text"
            fullWidth
            required={true}
            error={errors?.phone != null}
            helperText={errors?.phone != null && errors?.phone}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="demo-simple-select-outlined-label">
              Страна
            </InputLabel>
            <Select
              //labelId="demo-simple-select-outlined-label"
              //id="demo-simple-select-outlined"
              name="country_id"
              value={values.country_id ?? 175}
              onChange={handleChangeCountry}
              label="Страна"
            >
              {countries.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.rus}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="town"
            variant="outlined"
            autoComplete={"off"}
            value={values.town || ""}
            onChange={handleChange}
            margin="normal"
            label="Город"
            type="text"
            fullWidth
            inputProps={{ maxLength: 50 }}
            required
            error={errors?.town != null}
            helperText={errors?.town != null && errors?.town}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="address"
            variant="outlined"
            autoComplete={"off"}
            value={values.address || ""}
            onChange={handleChange}
            margin="normal"
            label="Адрес"
            type="text"
            fullWidth
            inputProps={{ maxLength: 50 }}
            required
            error={errors?.address != null}
            helperText={errors?.address != null && errors?.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="company"
            variant="outlined"
            autoComplete={"off"}
            value={values.company || ""}
            onChange={handleChange}
            margin="normal"
            label="Место работы"
            type="text"
            fullWidth
            inputProps={{ maxLength: 50 }}
            required
            error={errors?.company != null}
            helperText={errors?.company != null && errors?.company}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="link"
            variant="outlined"
            autoComplete={"off"}
            value={values.link || ""}
            onChange={handleChange}
            margin="normal"
            label="Сайт"
            type="text"
            fullWidth
            inputProps={{ maxLength: 150 }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center" mt={5}>
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <Button
              disabled={disabled}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
            >
              {values.id == null ? "Зарегистрироваться" : "Сохранить"}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default SignUpForm;
