import React from "react";
import { Grid, TextField as Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import Select from "@mui/material/Select";
// context
import { useUserStateDispatch } from "../../context/UserContext";

//form func
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import moment from "moment";
import InsuranceCompanyForm from "./InsuranceCompanyForm";
import MuiUIPicker from "../MUIDatePicker";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function ProfileForm({
  values,
  errors,
  handleChange,
  setValues,
  setErrors,
  isDisable,
  required = [],
  validate,
  mmkId,
}) {
  const { t } = useTranslation();

  const {
    userState: {
      user: { lang },
      appInfo,
    },
  } = useUserStateDispatch();

  const handleAnyChange = (val) => {
    const vals = {
      ...values,
      ...val,
    };
    console.log("vals", vals);
    setValues(vals);
    setErrors(validate(vals, appInfo));
  };
  const handlePhoneChange = (e) => {
    const vals = {
      ...values,
      phone: e.target.value,
    };
    setValues(vals);
    setErrors(validate(vals, appInfo));
  };

  const handleChangeGender = (event) => {
    const vals = {
      ...values,
      gender: event.target.value,
    };
    setValues(vals);
    setErrors(validate(vals, appInfo));
  };

  const defaultCalendarMonth = moment()
    .add(appInfo?.ageLimitHigh, "years")
    .startOf("year");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Input
          name="lastName"
          variant="outlined"
          value={values?.lastName || ""}
          onChange={handleChange}
          margin="normal"
          label={t("COMPONENT.FORM_LAST_NAME")}
          type="text"
          fullWidth
          inputProps={{ maxLength: 50 }}
          required={required.includes("lastName")}
          disabled={isDisable("lastName")}
          error={errors?.lastName != null}
          helperText={errors?.lastName != null && errors?.lastName}
        />
        <Input
          name="firstName"
          variant="outlined"
          value={values?.firstName || ""}
          onChange={handleChange}
          margin="normal"
          label={t("COMPONENT.FORM_NAME")}
          type="text"
          fullWidth
          inputProps={{ maxLength: 50 }}
          required={required.includes("firstName")}
          disabled={isDisable("firstName")}
          error={errors?.firstName != null}
          helperText={errors?.firstName != null && errors?.firstName}
        />

        <Input
          name="middleName"
          variant="outlined"
          value={values?.middleName || ""}
          onChange={handleChange}
          margin="normal"
          label={t("COMPONENT.FORM_MIDLE_NAME")}
          type="text"
          fullWidth
          inputProps={{ maxLength: 50 }}
          required={required.includes("middleName")}
          disabled={isDisable("middleName")}
          error={errors?.middleName != null}
          helperText={errors?.middleName != null && errors?.middleName}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            {t("COMPONENT.FORM_GENDER")}
          </InputLabel>
          <Select
            //labelId="demo-simple-select-outlined-label"
            //id="demo-simple-select-outlined"
            name="gender"
            disabled={isDisable("gender")}
            value={values?.gender != null ? values?.gender : ""}
            onChange={handleChangeGender}
            label={t("COMPONENT.FORM_GENDER")}
          >
            <MenuItem value="M">{t("COMPONENT.FORM_GENDER_M")}</MenuItem>
            <MenuItem value="F">{t("COMPONENT.FORM_GENDER_F")}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        {mmkId === "parent" && (
          <>
            {appInfo?.authIdentifiers !== "phone" && (
              <Input
                name="email"
                variant="outlined"
                value={values?.email || ""}
                onChange={handleChange}
                margin="normal"
                label={t("COMPONENT.FORM_EMAIL")}
                type="email"
                fullWidth
                required={required.includes("email")}
                disabled={isDisable("email")}
                error={errors?.email != null}
                helperText={errors?.email != null && errors?.email}
              />
            )}

            {errors.emailAndPhone != null && (
              <FormHelperText>{errors.emailAndPhone}</FormHelperText>
            )}
            {appInfo?.authIdentifiers !== "email" && (
              <InputMask
                mask={appInfo.phoneMask}
                value={values?.phone || ""}
                onChange={handlePhoneChange}
                //  disabled={values?.oldEmail == null}
                disabled={isDisable("phone")}
              >
                {() => (
                  <Input
                    name="phone"
                    variant="outlined"
                    value={values?.phone || ""}
                    margin="normal"
                    label={t("COMPONENT.FORM_PHONE")}
                    type="text"
                    fullWidth
                    required={required.includes("phone")}
                    error={errors?.phone != null}
                    disabled={isDisable("phone")}
                    helperText={errors?.phone != null && errors?.phone}
                  />
                )}
              </InputMask>
            )}
          </>
        )}

        <MuiUIPicker
          inputFormat={lang === "ru" ? "DD.MM.YYYY" : "MM/DD/YYYY"}
          //id="date-picker-inline"
          label={t("COMPONENT.BIRTH_DATE")}
          value={values?.birthDate != null ? values?.birthDate : null}
          handleChange={(birthDate) => {
            birthDate = birthDate != null ? new Date(birthDate) : null;
            handleAnyChange({ birthDate });
          }}
          defaultCalendarMonth={defaultCalendarMonth}
          minDate={moment().add(appInfo?.ageLimitLow, "years")}
          maxDate={moment().add(appInfo?.ageLimitHigh, "years")} //maxDate
          // invalidDateMessage={t('COMPONENT.INVALID_BIRTH_DATE')}
          // minDateMessage={t('COMPONENT.INVALID_BIRTH_DATE')}
          // maxDateMessage={t('COMPONENT.INVALID_BIRTH_DATE')}
          disabled={isDisable("birthDate")}
          required={required.includes("birthDate")}
          errorText={errors?.birthDate}
        />
        <Input
          variant="filled"
          value={values.id || ""}
          margin="normal"
          label={t("COMPONENT.FORM_USER_ID")}
          type="text"
          fullWidth
        />
      </Grid>
      <InsuranceCompanyForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleAnyChange={handleAnyChange}
        isDisable={isDisable}
      />
    </Grid>
  );
}

export default ProfileForm;
