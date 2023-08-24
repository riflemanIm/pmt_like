import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField as Input, Typography } from '@mui/material';

import { useLanguageValue } from '../../context/LanguageContext';
import { useUserStateDispatch } from '../../context/UserContext';
import MuiUIPicker from '../MUIDatePicker';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function InsuranceCompanyForm({
  values,
  errors,
  handleChange,
  handleAnyChange,
  isDisable,
  required = [],
}) {
  const { t } = useTranslation();

  const {
    languageState: { language },
  } = useLanguageValue();
  const {
    userState: { appInfo },
  } = useUserStateDispatch();

  return (
    (appInfo.showInsuranceDMS || appInfo?.showInsuranceOMS) && (
      <>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            {t('PROFILE.INSURANCE_COMPANY')}
          </Typography>
        </Grid>
        {appInfo.showInsuranceDMS && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="dmsName"
                  variant="outlined"
                  value={values?.dmsName || ''}
                  onChange={handleChange}
                  label={t('COMPONENT.FORM_DMS_NAME')}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 255 }}
                  required={required.includes('dmsName')}
                  disabled={isDisable('dmsName')}
                  error={errors?.dmsName != null}
                  helperText={
                    errors?.dmsName != null && errors?.dmsName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="dmsNumber"
                  variant="outlined"
                  value={values?.dmsNumber || ''}
                  onChange={handleChange}
                  label={t('COMPONENT.FORM_DMS_NUMBER')}
                  type="text"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  required={required.includes('dmsNumber')}
                  disabled={isDisable('dmsNumber')}
                  error={errors?.dmsNumber != null}
                  helperText={
                    errors?.dmsNumber != null && errors?.dmsNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiUIPicker
                  value={values.dmsEndDate}
                  handleChange={(dmsEndDate) => {
                    dmsEndDate =
                      dmsEndDate != null
                        ? new Date(dmsEndDate)
                        : null;
                    handleAnyChange({ dmsEndDate });
                  }}
                  inputFormat={
                    language === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY'
                  }
                  disablePast={true}
                  label={t('COMPONENT.FORM_DMS_END_DATE')}
                  errorText={errors?.dmsEndDate}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {appInfo?.showInsuranceOMS && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="omsName"
                  variant="outlined"
                  value={values?.omsName || ''}
                  onChange={handleChange}
                  label={t('COMPONENT.FORM_OMS_NAME')}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 255 }}
                  required={required.includes('omsName')}
                  disabled={isDisable('omsName')}
                  error={errors?.omsName != null}
                  helperText={
                    errors?.omsName != null && errors?.omsName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="omsNumber"
                  variant="outlined"
                  value={values?.omsNumber || ''}
                  onChange={handleChange}
                  label={t('COMPONENT.FORM_OMS_NUMBER')}
                  type="number"
                  fullWidth
                  required={required.includes('omsNumber')}
                  disabled={isDisable('omsNumber')}
                  error={errors?.omsNumber != null}
                  helperText={
                    errors?.omsNumber != null && errors?.omsNumber
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
    )
  );
}

export default InsuranceCompanyForm;
