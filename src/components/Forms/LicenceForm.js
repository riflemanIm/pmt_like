import React from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  Grid,
  TextField as Input,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import isEmpty from "../../helpers";

const useStyles = makeStyles((theme) => ({
  form: { maxWidth: 400, margin: "auto" },
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
  formButtons: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },

  loginLoader: {
    marginLeft: theme.spacing(4),
  },
}));

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function LicenceForm({
  values,
  errors,
  serverResponse,
  handleChange,
  handleSubmit,

  setValues,
  setErrors,
  validate,
  isLoading,
}) {
  const classes = useStyles();
  const handleChangeReasonStandart = (event) => {
    const vals = {
      ...values,
      reason_standart: event.target.value,
    };
    setValues(vals);
    setErrors(validate(vals));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Fade
          in={!!serverResponse}
          style={
            serverResponse == null ? { display: "none" } : { display: "flex" }
          }
        >
          <Alert severity="error" className={classes.errorMessage}>
            {serverResponse || "error"}
          </Alert>
        </Fade>
      </Grid>
      <Grid item xs={12}>
        <Input
          name="login"
          variant="outlined"
          value={values?.login || ""}
          onChange={handleChange}
          margin="normal"
          label="Логин доступа к FTP"
          type="text"
          fullWidth
          inputProps={{ maxLength: 30 }}
          required={true}
          error={errors?.login != null}
          helperText={errors?.login != null && errors?.login}
        />
        <Input
          name="password"
          variant="outlined"
          value={values?.password || ""}
          onChange={handleChange}
          margin="normal"
          label="Пароль для получения лицензи"
          type="text"
          fullWidth
          inputProps={{ maxLength: 30 }}
          required={true}
          error={errors?.password != null}
          helperText={errors?.password != null && errors?.password}
        />

        <Input
          name="version"
          variant="outlined"
          value={values?.version || ""}
          onChange={handleChange}
          margin="normal"
          label="Версия (для 6.20 и выше)"
          type="text"
          fullWidth
          inputProps={{ maxLength: 30 }}
          //required={true}
          error={errors?.version != null}
          helperText={errors?.version != null && errors?.version}
        />
        <Input
          name="code"
          variant="outlined"
          value={values?.code || ""}
          onChange={handleChange}
          margin="normal"
          label="Код продукта"
          type="text"
          fullWidth
          inputProps={{ maxLength: 30 }}
          required={true}
          error={errors?.code != null}
          helperText={errors?.code != null && errors?.code}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Причины получения аварийной лицензии
          </InputLabel>
          <Select
            //labelId="demo-simple-select-outlined-label"
            //id="demo-simple-select-outlined"
            name="reason_standart"
            value={
              values?.reason_standart != null ? values?.reason_standart : ""
            }
            onChange={handleChangeReasonStandart}
            label="Причины получения аварийной лицензии"
          >
            <MenuItem value="Плановые работы">Плановые работы</MenuItem>
            <MenuItem value="Тестовая база">Тестовая база</MenuItem>
            <MenuItem value="Аварийная ситуация">Аварийная ситуация</MenuItem>
            <MenuItem value="Другая причина">Другая причина</MenuItem>
          </Select>
          <Input
            name="reason"
            variant="outlined"
            value={values?.reason || ""}
            onChange={handleChange}
            margin="normal"
            label="Другая причина"
            multiline
            rows={5}
            type="text"
            fullWidth
            inputProps={{ maxLength: 30 }}
          />
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
              Получить лицензию
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default LicenceForm;
