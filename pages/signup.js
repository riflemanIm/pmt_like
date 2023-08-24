import React, { useEffect, useState } from "react";
import Router from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, Icon } from "@material-ui/core";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import Warning from "@material-ui/icons/Warning";
import DoneIcon from "@material-ui/icons/Done";
// core components
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Loading from "../components/Loading";

import validate from "../validation/validationSignUp.js";
import useForm from "../hooks/useForm.js";
import useInterval from "../hooks/useInterval.js";
import isEmpty, { getUrlbyLang } from "../helpers";

import styles from "../styles/jss/nextjs-material-kit/pages/signupPage.js";
import { useUserStateDispatch } from "../context/UserContext.js";
import { createUser } from "../actions/user.js";
import ModaleTerms from "../pages-sections/SignUp/ModaleTerms.js";

const useStyles = makeStyles(styles);

export default function SignUpPage(props) {
  const { menu, locale, bilet, data, ...rest } = props;
  const intl = useIntl();
  const {
    userState: { loaded, serverResponse, isAuthenticated },
    userDispatch,
  } = useUserStateDispatch();

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push(getUrlbyLang("profile", locale));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    //console.log("locale", locale);
    if (isAuthenticated) {
      Router.push(getUrlbyLang("profile", locale));
    }
  }, [isAuthenticated]);

  const classes = useStyles();

  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  useInterval(
    () => {
      setCardAnimation("");
    },
    true,
    700
  );

  useInterval(
    () => {
      if (
        serverResponse === "SOMETHING_WRONG" ||
        serverResponse === "EMAIL_EXISTS"
      ) {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: null,
        });
        Router.push(getUrlbyLang("signup", locale));
      }

      if (serverResponse === "SUCCESS_CREATE") {
        userDispatch({
          type: "SET_SERVER_RESPONSE",
          payload: null,
        });
        Router.push(getUrlbyLang("signin", locale));
      }
    },
    serverResponse !== null,
    5000
  );

  const submit = () => {
    console.log("submit");
    delete values.repassword;
    createUser(userDispatch, values);
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submit,
    validate
  );

  useEffect(() => {
    setValues({
      // email: "oleglambin+1@gmail.com",
      // password: "Rock11city!",
      // repassword: "Rock11city!",
      // name: "Oleg",
      // jabber: "oleglambin@gmail.com",
      bilet,
      terms: true,
    });
  }, []);

  //console.log("=== terms ===", values.terms);

  const handleChangeTerms = (event) => {
    const vals = {
      ...values,
      terms: event.target.checked,
    };
    setValues(vals);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="OpenVPN.pro"
        rightLinks={<HeaderLinks menu={menu} locale={locale} />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/profile-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        {values.bilet != null && (
          <div className={classes.container}>
            <GridContainer justifyContent="center">
              <GridItem xs={12} md={6} sm={8}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>
                        <FormattedMessage id="page.reg" />
                      </h4>
                    </CardHeader>
                    <p className={classes.divider}>
                      {serverResponse === "SOMETHING_WRONG" && (
                        <SnackbarContent
                          message={
                            <span>
                              <FormattedMessage id="page.form.error.biletik" />
                            </span>
                          }
                          color="warning"
                          icon={Warning}
                        />
                      )}
                      {serverResponse === "EMAIL_EXISTS" && (
                        <SnackbarContent
                          message={
                            <span>
                              <FormattedMessage id="page.reg.error.email_exists" />
                            </span>
                          }
                          color="warning"
                          icon={Warning}
                        />
                      )}
                      {serverResponse === "SUCCESS_CREATE" && (
                        <SnackbarContent
                          message={
                            <span>
                              <FormattedMessage id="page.reg.success.create_user" />
                            </span>
                          }
                          color="success"
                          icon={DoneIcon}
                        />
                      )}

                      {serverResponse == null && (
                        <FormattedMessage id="page.reg.descr" />
                      )}
                      {!loaded && <Loading />}
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText={intl.formatMessage({
                          id: "page.form.email",
                        })}
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        autoComplete={false}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        error={values.email != null && errors?.email != null}
                        helperText={
                          values.email != null &&
                          errors?.email != null &&
                          errors?.email
                        }
                      />

                      <CustomInput
                        labelText={intl.formatMessage({
                          id: "page.form.password",
                        })}
                        name="password"
                        value={values.password || ""}
                        autoComplete={false}
                        onChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                        error={
                          values.password != null && errors?.password != null
                        }
                        helperText={
                          values.password != null &&
                          errors?.password != null &&
                          errors?.password
                        }
                      />

                      <CustomInput
                        labelText={intl.formatMessage({
                          id: "page.form.repassword",
                        })}
                        name="repassword"
                        value={values.repassword || ""}
                        autoComplete={false}
                        onChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                        error={
                          values.repassword != null &&
                          errors?.repassword != null
                        }
                        helperText={
                          values.repassword != null &&
                          errors?.repassword != null &&
                          errors?.repassword
                        }
                      />

                      <CustomInput
                        labelText={intl.formatMessage({
                          id: "page.form.name",
                        })}
                        name="name"
                        value={values.name || ""}
                        onChange={handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        autoComplete={false}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        error={values.name != null && errors?.name != null}
                        helperText={
                          values.name != null &&
                          errors?.name != null &&
                          errors?.name
                        }
                      />
                      {/* <CustomInput
                      labelText="Jabber"
                      name="jabber"
                      value={values.jabber || ""}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      autoComplete={false}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      error={values.jabber != null && errors?.jabber != null}
                      helperText={
                        values.jabber != null &&
                        errors?.jabber != null &&
                        errors?.jabber
                      }
                    /> */}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <GridContainer justifyContent="center">
                        <GridItem xs={12} md={7} align="center">
                          <ModaleTerms
                            page={data.page}
                            terms={values.terms}
                            handleChange={handleChangeTerms}
                          />
                        </GridItem>{" "}
                        <GridItem xs={12} md={5} align="center">
                          <Button
                            color="primary"
                            size="lg"
                            disabled={
                              !loaded || !isEmpty(errors) || !values.terms
                            }
                            onClick={handleSubmit}
                            indeterminate
                          >
                            <FormattedMessage id="page.form.submit" />
                          </Button>
                        </GridItem>
                        <GridItem xs={12} align="center">
                          <Button
                            simple
                            color="primary"
                            size="md"
                            href={getUrlbyLang("signin", locale)}
                          >
                            <FormattedMessage id="page.auth" />
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        )}
        <Footer whiteFont locale={locale} />
      </div>
    </div>
  );
}
//Another option using getserversideprops, but must pass {data} to the page
export async function getServerSideProps(context) {
  const locale = context.locale;
  const postData = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      locale,
    }),
  };
  const res = await fetch(`${process.env.API_HOST}/api/menu`, postData);
  const menu = await res.json();

  const res1 = await fetch(`${process.env.API_HOST}/api/biletik`, postData);
  const bilet = await res1.json();

  const postData1 = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      route: "rules",
      locale,
    }),
  };
  const res2 = await fetch(`${process.env.API_HOST}/api/page`, postData1);
  const data = await res2.json();

  return { props: { menu, bilet: bilet.value, data } };
}
