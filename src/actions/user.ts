import axios, { AxiosError } from "axios";
import isEmpty, { getError } from "../helpers";
import type { Dispatch } from "react";

// Base API URL from environment
const API_URL = process.env.API_URL as string;

// Set default headers for JSON
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Helper to get auth token
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

// 1. Fetch countries
export async function getCountries(): Promise<any[]> {
  try {
    const { data } = await axios.get(`${API_URL}/countries`);
    return data;
  } catch (error: unknown) {
    console.error("Error fetching countries:", getError(error));
    throw new Error("Failed to fetch countries");
  }
}

// 2. Fetch IP
export async function getIpData(
  setValues: (vals: { ip: string }) => void
): Promise<void> {
  try {
    const { data } = await axios.get<{ ip: string }>(
      "https://api.ipify.org?format=json"
    );
    setValues({ ip: data.ip });
  } catch (error: unknown) {
    console.error("Error fetching IP:", getError(error));
    throw new Error("Failed to fetch IP data");
  }
}

// 3. Fetch user data by email
export async function getUserData(
  setValues: (vals: any) => void,
  email: string
): Promise<void> {
  try {
    const token = getAuthToken();
    const { data } = await axios.post<any>(
      "/api/getting-user-data",
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setValues({ ...data, password: data.pwd, repassword: data.pwd });
  } catch (error: unknown) {
    console.error("Error fetching user data:", getError(error));
  }
}

// Generic action type
type Action = { type: string; payload?: any };

// 4. Login
export async function loginUser(
  dispatch: Dispatch<Action>,
  login: string,
  password: string
): Promise<void> {
  if (!login || !password) {
    dispatch({ type: "LOGIN_FAILURE" });
    return;
  }
  dispatch({ type: "LOADING" });
  try {
    const { data } = await axios.post<any>("/api/signin", { login, password });
    if (!isEmpty(data)) {
      localStorage.setItem("auth_token", data.token);
      dispatch({ type: "LOGIN", payload: data });
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "Invalid credentials" },
      });
    }
  } catch (err: unknown) {
    const msg = getError(err);
    console.error("Login error:", msg);
    dispatch({ type: "SET_SERVER_RESPONSE", payload: { serverResponse: msg } });
  }
}

// 5. Request password reset
export async function sendPass(
  dispatch: Dispatch<Action>,
  login: string
): Promise<void> {
  if (!login) {
    dispatch({ type: "LOGIN_FAILURE" });
    return;
  }
  dispatch({ type: "LOADING" });
  try {
    const { data } = await axios.post<any>("/api/sendpass", { login });
    dispatch({
      type: "SET_SERVER_RESPONSE",
      payload: { serverResponse: data ? "PASS_SENT" : "EMAIL_NOT_FOUND" },
    });
  } catch (err: unknown) {
    const msg = getError(err);
    if (msg === "jwt expired") {
      dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "Session expired. Please login again." },
      });
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: msg },
      });
    }
  }
}

// 6. Create or update profile
export async function profile(
  dispatch: Dispatch<Action>,
  values: any
): Promise<void> {
  if (isEmpty(values)) return;
  dispatch({ type: "LOADING" });
  try {
    const { data: ipData } = await axios.get<{ ip: string }>(
      "https://api.ipify.org?format=json"
    );
    const payload = { ...values, ip: ipData.ip };
    const token = getAuthToken();
    let response;
    if (values.id) {
      response = await axios.put<any>("/api/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      response = await axios.post<any>("/api/profile", payload);
    }
    const result = response.data;

    if (result.result === "ok" || result.result === "Updated") {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: {
          serverResponse:
            result.result === "ok" ? "SUCCESS_CREATE" : "SUCCESS_UPDATE",
          data: { ...values, id: result.id, token: result.token },
        },
      });
      if (result.token) localStorage.setItem("auth_token", result.token);
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "SOMETHING_WRONG" },
      });
    }
  } catch (err: unknown) {
    const msg = getError(err);
    if (msg === "jwt expired") {
      dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "Session expired. Please login again." },
      });
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: msg },
      });
    }
  }
}

// 7. Check authentication
export async function checkAuth(
  dispatch: Dispatch<Action>,
  token: string
): Promise<void> {
  if (!isEmpty(token)) {
    await axios
      .post(
        "/api/check-auth",
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        console.log("check-auth", data);
      })
      .catch((err) => {
        if (err?.response?.data?.message === "jwt expired") {
          dispatch({ type: "SIGN_OUT_SUCCESS" });
          dispatch({
            type: "SET_SERVER_RESPONSE",
            payload: { serverResponse: "Session expired. Please login again." },
          });
        }
      });
  }
}

// 8. Send generic form email
export async function sendFormEmail(
  setSend: any,
  bilet: string,
  values: any,
  locale: string
): Promise<void> {
  setSend({ isLoaded: false, response: null });
  try {
    const { data } = await axios.post<any>("/api/send-form", {
      bilet,
      locale,
      ...values,
    });
    if (data.sent === "ok")
      setSend({ isLoaded: true, sent: "ok", response: "Message sent" });
  } catch (err: unknown) {
    console.error("sendFormEmail error:", getError(err));
    setSend({ isLoaded: true, sent: "error", response: getError(err) });
  }
}

// 9. Get licence
export async function getLicence(
  dispatch: Dispatch<Action>,
  values: any,
  user: any,
  lic: string
): Promise<void> {
  dispatch({ type: "LOADING" });
  try {
    const { data } = await axios.post<any>("/api/lic", {
      ...values,
      user,
      lic,
    });
    if (!isEmpty(data)) dispatch({ type: "LICENCE", payload: data.lic });
    else
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "WRONG_LICENCE" },
      });
  } catch (err: unknown) {
    const msg = getError(err);
    if (msg === "jwt expired") {
      dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: "Session expired. Please login again." },
      });
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: msg },
      });
    }
  }
}
