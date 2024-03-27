import axios from "axios";
import isEmpty, { getError } from "../helpers";

export async function getCountries() {
  try {
    const postData = {
      method: "Get",
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(
      `${process.env.API_URL}/countries`,
      postData
    );
    console.log("data--", data);
    return data;
  } catch (error) {
    console.log("error", getError(error));
  }
}

export async function getIpData(setValues) {
  try {
    const { data } = await axios.get("https://api.ipify.org/?format=json");
    setValues({
      login: "support",
      password: "Temp_Lic$$",
      version: "8.105",
      code: "11111111",
      reason_standart: "Плановые работы",
      reason: "работы",
      ip: data.ip,
    });
  } catch (error) {
    console.log("error", error);
  }
}
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
        //console.log("data", data);
        if (!isEmpty(data))
          dispatch({
            type: "LOGIN",
            payload: data,
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: { serverResponse: "Комбинация логин/пароль не верна" },
          });
      })
      .catch((err) => {
        console.log("  ---- err ---", err?.response?.data?.message);
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: err?.response?.data?.message },
        });
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
  }
}
export async function sendPass(dispatch, login) {
  if (login.length > 0) {
    dispatch({
      type: "LOADING",
    });
    await axios
      .post("/api/sendpass", {
        login,
      })
      .then(({ data }) => {
        console.log("data", data);
        if (!isEmpty(data))
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse: "PASS_SENDED",
            },
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse: "EMAIL_DOESNT_EXISTS",
            },
          });
      })
      .catch((err) => {
        if (err?.response?.data?.message === "jwt expired") {
          dispatch({
            type: "SIGN_OUT_SUCCESS",
          });
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse:
                "Время авторизации вышло. Войдите заново пожалуйста",
            },
          });
        }
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: err?.response?.data?.message },
        });
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
  }
}

export async function profile(dispatch, values) {
  if (!isEmpty(values)) {
    dispatch({
      type: "LOADING",
    });
    try {
      const { data } = await axios.get("https://api.ipify.org/?format=json");
      const ip = data.ip;
      values = { ...values, ip };
    } catch (error) {
      console.log("error", error);
    }

    await axios
      .post(`/api/${values.id != null ? "profile" : "signup"}`, {
        ...values,
      })
      .then(({ data }) => {
        //console.log("data", data);
        if (data.result === "ok")
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse: "SUCCESS_CREATE",
              data: {
                ...values,
                id: data.id,
                token: data.token,
              },
            },
          });
        else if (data.result === "ok_update")
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: { serverResponse: "SUCCESS_UPDATE", data: values },
          });
        else
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: { serverResponse: "SOMETHING_WRONG" },
          });
      })
      .catch((err) => {
        if (err?.response?.data?.message === "jwt expired") {
          dispatch({
            type: "SIGN_OUT_SUCCESS",
          });
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse:
                "Время авторизации вышло. Войдите заново пожалуйста",
            },
          });
        }
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: getError(err) },
        });
      });
  }
}

export async function checkAuth(dispatch, token) {
  //console.log("checkAuth", token);

  if (!isEmpty(token)) {
    await axios
      .post("/api/check-auth", {
        token,
      })
      .then(({ data }) => {
        console.log("check-auth", data);
      })
      .catch((err) => {
        if (err?.response?.data?.message === "jwt expired") {
          dispatch({
            type: "SIGN_OUT_SUCCESS",
          });
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: {
              serverResponse:
                "Время авторизации вышло. Войдите заново пожалуйста",
            },
          });
        }
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

export async function getRescueLicence(dispatch, values, user) {
  dispatch({
    type: "LOADING",
  });
  await axios
    .post("/api/lic", {
      ...values,
      user,
    })
    .then(({ data }) => {
      if (!isEmpty(data))
        dispatch({
          type: "RESCUE_LICENCE",
          payload: data.lic,
        });
      else
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: "WRONG_RESCUE_LICENCE" },
        });
    })
    .catch((err) => {
      if (err?.response?.data?.message === "jwt expired") {
        dispatch({
          type: "SIGN_OUT_SUCCESS",
        });
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: {
            serverResponse:
              "Время авторизации вышло. Войдите заново пожалуйста",
          },
        });
      }

      console.log("  ---- err ---", err);
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: err?.response?.data?.message },
      });
    });
}
