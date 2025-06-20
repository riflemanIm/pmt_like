import axios, { AxiosInstance, AxiosError } from "axios";
import isEmpty, { getError } from "../helpers";
import type { Dispatch } from "react";
import { UserAction } from "context/UserContext";
import { CountryDto, ForumUserDto } from "types/dto";
import { getFromLocalStorage } from "helpers/storageHelpers";

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
console.log("NEXT_PUBLIC_API_URL", API_URL);
// Create an axios instance that injects the auth token on each request
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 1. Fetch countries

export async function getCountries(): Promise<CountryDto[]> {
  try {
    const { data } = await apiClient.get<CountryDto[]>("/countries");
    return data;
  } catch (error: unknown) {
    const msg = getError(error);
    console.error(`Error fetching countries: ${msg}`);
    throw new Error(`Failed to fetch countries: ${msg}`);
  }
}

// 2. Fetch IP
export async function getIpData(
  setValues: (vals: { ip: string }) => void
): Promise<void> {
  try {
    const { data } = await apiClient.get<{ ip: string }>(
      "https://api.ipify.org?format=json"
    );
    setValues({
      // login: "support",
      // password: "Temp_Lic$$",
      // version: "8.105",
      // code: "11111111",
      // reason_standart: "Плановые работы",
      // reason: "работы",
      ip: data.ip,
    });
    //setValues({ ip: data.ip });
  } catch (error: unknown) {
    console.error("Error fetching IP:", getError(error));
    setValues({
      ip: "127.0.0.1",
    });
    //throw new Error("Failed to fetch IP data");
  }
}

// 3. Fetch user data by id
export async function getUserData(
  setValues: (
    vals: ForumUserDto & { password: string; repassword: string }
  ) => void,
  id: number
): Promise<void> {
  try {
    const { data } = await apiClient.get<ForumUserDto>(`/profile?id=${id}`);

    setValues({
      ...(data as ForumUserDto),
      password: data.password,
      repassword: data.password,
    });
  } catch (error: unknown) {
    console.error("Error fetching user data:", getError(error));
  }
}

export async function fetchUsers(
  setUsers: (vals: ForumUserDto[]) => void
): Promise<void> {
  try {
    const { data } = await apiClient.get<ForumUserDto[]>("/profile");
    setUsers(data);
  } catch (error: unknown) {
    console.error("Error fetching users:", getError(error));
  }
}
// 4. Login
export async function loginUser(
  dispatch: Dispatch<UserAction>,
  login: string,
  password: string
): Promise<void> {
  console.log("loginUser----");
  dispatch({ type: "LOADING" });
  try {
    const { data } = await apiClient.post<any>("/signin", { login, password });
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
    console.log("Login error:", msg);
    dispatch({
      type: "SET_SERVER_RESPONSE",
      payload: { serverResponse: "Неверный пароль/логин" },
    });
  }
}

// 5. Request password reset
export async function sendPass(
  dispatch: Dispatch<UserAction>,
  login: string
): Promise<void> {
  if (!login) {
    return;
  }
  dispatch({ type: "LOADING" });
  try {
    const { data } = await apiClient.post<any>("/sendpass", { login });
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
  dispatch: Dispatch<UserAction>,
  values: any
): Promise<void> {
  if (isEmpty(values)) return;
  dispatch({ type: "LOADING" });
  try {
    const { data: ipData } = await axios.get<{ ip: string }>(
      "https://api.ipify.org?format=json" // без лишнего '/'
    );
    const payload = { ...values, ip: ipData.ip };
    let response;
    if (values.id) {
      response = await apiClient.put<any>("/profile", payload);
    } else {
      response = await apiClient.post<any>("/profile", payload);
    }
    const result = response.data;
    if (result.message === "ok" || result.message === "Updated") {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: {
          serverResponse:
            result.message === "ok" ? "SUCCESS_CREATE" : "SUCCESS_UPDATE",
          data: { ...values, id: result.id, token: result.token },
        },
      });
      if (result.token) {
        localStorage.setItem("auth_token", result.token);
      }
    } else {
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: result.message || "SOMETHING_WRONG" },
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
      console.log("Error msg", msg);
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: { serverResponse: msg },
      });
    }
  }
}

// 7. Check authentication
export async function checkAuth(
  dispatch: Dispatch<UserAction>,
  token: string
): Promise<void> {
  if (!isEmpty(token)) {
    try {
      await apiClient.post("/check-auth", { token });
    } catch (err: unknown) {
      const msg = getError(err as AxiosError);
      if (msg === "jwt expired") {
        dispatch({ type: "SIGN_OUT_SUCCESS" });
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: { serverResponse: "Session expired. Please login again." },
        });
      }
    }
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
    const { data } = await apiClient.post<any>("/send-form", {
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
  dispatch: Dispatch<UserAction>,
  values: any,
  lic: string
): Promise<void> {
  dispatch({ type: "LOADING" });
  try {
    const { data } = await apiClient.post<any>("/lic", {
      ...values,
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
    if (msg === "jwt expired") dispatch({ type: "SIGN_OUT_SUCCESS" });
    dispatch({ type: "SET_SERVER_RESPONSE", payload: { serverResponse: msg } });
  }
}

export async function deleteUser<T extends { id: number }>(
  setUsers: (vals: T[]) => void,
  users: T[],
  id: number
): Promise<void> {
  try {
    const { data } = await apiClient.delete(`/profile?id=${id}`);
    if (data.message === "Deleted") {
      setUsers(users.filter((item) => item.id !== id));
    }
  } catch (error: unknown) {
    console.error("Error fetching user data:", getError(error));
  }
}
