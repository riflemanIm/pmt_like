import React, { useMemo } from 'react';
import { TextField as Input } from '@mui/material';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';

function FIOandPhoneForm({
  values,
  errors,
  handleChange,
  setValues,
  setErrors,
  validate,
  appInfo,
}) {
  const { t } = useTranslation();

  const handlePhoneChange = (e) => {
    const vals = {
      ...values,
      phone: e.target.value,
    };
    setValues(vals);
    setErrors(validate(vals, appInfo));
  };
  //console.log('errors', errors);
  return useMemo(
    () => (
      <>
        <Input
          name="lastName"
          variant="outlined"
          value={values?.lastName || ''}
          onChange={handleChange}
          margin="normal"
          label={t('COMPONENT.FORM_LAST_NAME')}
          type="text"
          fullWidth
          required
          inputProps={{ maxLength: 50 }}
          error={errors?.lastName != null}
          helperText={errors?.lastName != null && errors?.lastName}
        />
        <Input
          name="firstName"
          variant="outlined"
          value={values?.firstName || ''}
          onChange={handleChange}
          margin="normal"
          label={t('COMPONENT.FORM_NAME')}
          type="text"
          fullWidth
          required
          inputProps={{ maxLength: 50 }}
          error={errors?.firstName != null}
          helperText={errors?.firstName != null && errors?.firstName}
        />
        <Input
          name="middleName"
          variant="outlined"
          value={values?.middleName || ''}
          onChange={handleChange}
          margin="normal"
          label={t('COMPONENT.FORM_MIDLE_NAME')}
          type="text"
          fullWidth
          inputProps={{ maxLength: 50 }}
          error={errors?.middleName != null}
          helperText={
            errors?.middleName != null && errors?.middleName
          }
        />

        <InputMask
          mask={appInfo.phoneMask}
          value={values?.phone}
          onChange={handlePhoneChange}
        >
          {() => (
            <Input
              name="phone"
              variant="outlined"
              value={values?.phone}
              margin="normal"
              label={t('COMPONENT.FORM_PHONE')}
              type="text"
              fullWidth
              required
              error={errors?.phone != null}
              helperText={errors?.phone != null && errors?.phone}
            />
          )}
        </InputMask>
      </>
    ),

    [values, errors],
  );
}

export default FIOandPhoneForm;
