import axios from "axios";
import isEmpty, { getError } from "../helpers";

export async function loginUser(dispatch, login, password) {
  if (login.length > 0 && password.length > 0) {
    dispatch({
      type: "LOADING",
    });
    await axios
      .post("/api/signin", {
        login,
        password,
      })
      .then(({ data }) => {
        if (!isEmpty(data))
          dispatch({
            type: "LOGIN",
            payload: data,
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: "WRONG",
          });
      })
      .catch((err) => {
        console.log("  ---- err ---", err?.message);
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: err?.message,
        });
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
  }
}
export async function createUser(dispatch, values) {
  if (!isEmpty(values)) {
    dispatch({
      type: "LOADING",
    });
    await axios
      .post("/api/signup", {
        ...values,
      })
      .then(({ data }) => {
        //console.log("data", data);
        if (data?.result === "ok")
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: "SUCCESS_CREATE",
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: "SOMETHING_WRONG",
          });
      })
      .catch((err) => {
        console.log("  ---- err ---", getError(err));
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: getError(err),
        });
      });
  }
}

export async function checkAuth(dispatch, token) {
  //console.log("checkAuth", token);

  if (!isEmpty(token)) {
    // dispatch({
    //   type: "LOADING",
    // });
    await axios
      .post("/api/check-auth", {
        token,
      })
      .then(({ data }) => {
        //console.log("check-auth", data);
        if (data.token === token)
          dispatch({
            type: "SET_USER",
            payload: {
              isAuthenticated: true,
            },
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: "WRONG",
          });
      })
      .catch((err) => {
        console.log("  ---- err ---", err?.message);
        dispatch({
          type: "SIGN_OUT_SUCCESS",
          payload: err?.message,
        });
      });
  }
}

export async function sendFormEmail({ setSend, bilet, values, locale }) {
  setSend({
    isLoaded: false,
    response: null,
  });
  await axios
    .post("/api/send-form", {
      bilet,
      locale,
      ...values,
    })
    .then(({ data }) => {
      //console.log("addOrder", data);
      if (data.sent === "ok")
        setSend({
          isLoaded: true,
          sent: "ok",
          response: "Собщение отправлено",
        });
    })
    .catch((err) => {
      console.log("====== sendFormEmail =======", getError(err));
      setSend({
        isLoaded: true,
        sent: "error",
        response: getError(err),
      });
    });
}
