import axios, { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import isEmpty, { getError } from "../helpers";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../helpers/storageHelpers";

import { ForumUserDto } from "types/dto";

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

/**
 * AuthUser: minimal authenticated user
 */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

/** State and actions */
interface AppState {
  token: string | null;
  currentUser: AuthUser | null;
  users: ForumUserDto[];
  countries: any[];
  ip: string;
  serverResponse: string | null;
  licence: string | null;
  loaded: boolean;
}

type AppAction =
  | { type: "LOGIN"; payload: { token: string; user: AuthUser } }
  | { type: "SIGN_OUT_SUCCESS" }
  | { type: "SET_CURRENT_USER"; payload: AuthUser }
  | { type: "SET_USERS"; payload: ForumUserDto[] }
  | { type: "ADD_USER"; payload: ForumUserDto }
  | { type: "UPDATE_USER"; payload: ForumUserDto }
  | { type: "DELETE_USER"; payload: number }
  | { type: "SET_COUNTRIES"; payload: any[] }
  | { type: "SET_IP"; payload: string }
  | { type: "SET_SERVER_RESPONSE"; payload: string }
  | { type: "LICENCE"; payload: string }
  | { type: "LOADING" }
  | { type: "SET_LOADED"; payload: boolean };

const initialState: AppState = {
  token:
    typeof window !== "undefined"
      ? getFromLocalStorage<{ token: string }>("user")?.token || null
      : null,
  currentUser: null,
  users: [],
  countries: [],
  ip: "",
  serverResponse: null,
  licence: null,
  loaded: true,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOADING":
      return { ...state, loaded: false };
    case "SET_LOADED":
      return { ...state, loaded: action.payload };
    case "LOGIN":
      saveToLocalStorage("user", action.payload);
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user,
        loaded: true,
        serverResponse: null,
      };
    case "SIGN_OUT_SUCCESS":
      removeFromLocalStorage("user");

      return {
        ...state,
        token: null,
        currentUser: null,
        loaded: true,
        serverResponse: null,
      };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload, loaded: true };
    case "SET_USERS":
      return { ...state, users: action.payload, loaded: true };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case "SET_COUNTRIES":
      return { ...state, countries: action.payload };
    case "SET_IP":
      return { ...state, ip: action.payload };
    case "SET_SERVER_RESPONSE":
      return { ...state, serverResponse: action.payload, loaded: true };
    case "LICENCE":
      return { ...state, licence: action.payload, loaded: true };
    default:
      throw new Error(`Unhandled action type ${(action as any).type}`);
  }
}

interface AppContextType extends AppState {
  loginUser: (login: string, password: string) => Promise<void>;
  sendPass: (login: string) => Promise<void>;
  profile: (values: any) => Promise<void>;
  checkAuth: (token: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
  createUser: (user: Omit<ForumUserDto, "id">) => Promise<void>;
  updateUser: (user: ForumUserDto) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getCountries: () => Promise<void>;
  getIpData: () => Promise<void>;
  getUserData: (
    setValues: (vals: ForumUserDto) => void,
    email: string
  ) => Promise<any>;
  sendFormEmail: (bilet: string, values: any, locale: string) => Promise<void>;
  getLicence: (values: any, lic: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  function getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  // 1. Fetch countries
  const fetchCountries = async () => {
    try {
      const { data } = await axios.get<any[]>("/countries");
      dispatch({ type: "SET_COUNTRIES", payload: data });
    } catch (error: unknown) {
      console.error("Error fetching countries:", getError(error));
    }
  };

  // 2. Fetch IP
  const fetchIp = async () => {
    try {
      const { data } = await axios.get<{ ip: string }>(
        "https://api.ipify.org?format=json"
      );
      dispatch({ type: "SET_IP", payload: data.ip });
    } catch (error: unknown) {
      console.error("Error fetching IP:", getError(error));
    }
  };

  // 3. Fetch user data by email
  const getUserData = async (
    setValues: (vals: ForumUserDto) => void,
    email: string
  ) => {
    try {
      const token = getAuthToken();
      const { data } = await axios.post<any>(
        "/getting-user-data",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setValues({ ...data, password: data.pwd, repassword: data.pwd });
    } catch (error: unknown) {
      console.error("Error fetching user data:", getError(error));
    }
  };

  // 4. Login
  const loginUser = async (login: string, password: string) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post<any>("/signin", { login, password });
      if (!isEmpty(data)) {
        localStorage.setItem("auth_token", data.token);
        dispatch({ type: "LOGIN", payload: { token: data.token, user: data } });
      } else {
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: "Invalid credentials",
        });
      }
    } catch (err: unknown) {
      const msg = getError(err);
      dispatch({ type: "SET_SERVER_RESPONSE", payload: msg });
    }
  };

  // 5. Request password reset
  const sendPass = async (login: string) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post<any>("/sendpass", { login });
      dispatch({
        type: "SET_SERVER_RESPONSE",
        payload: data ? "PASS_SENT" : "EMAIL_NOT_FOUND",
      });
    } catch (err: unknown) {
      const msg = getError(err);
      if (msg === "jwt expired") dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({ type: "SET_SERVER_RESPONSE", payload: msg });
    }
  };

  // 6. Create or update profile
  const profile = async (values: any) => {
    if (isEmpty(values)) return;
    dispatch({ type: "LOADING" });
    try {
      const { data: ipData } = await axios.get<{ ip: string }>(
        "https://api.ipify.org?format=json"
      );
      const payload = { ...values, ip: ipData.ip };
      const token = getAuthToken();
      const response = values.id
        ? await axios.put<any>("/profile", payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await axios.post<any>("/profile", payload);
      const result = response.data;
      if (["ok", "Updated"].includes(result.result)) {
        dispatch({
          type: "SET_SERVER_RESPONSE",
          payload: result.result === "ok" ? "SUCCESS_CREATE" : "SUCCESS_UPDATE",
        });
        if (result.token) localStorage.setItem("auth_token", result.token);
      } else {
        dispatch({ type: "SET_SERVER_RESPONSE", payload: "SOMETHING_WRONG" });
      }
    } catch (err: unknown) {
      const msg = getError(err);
      if (msg === "jwt expired") dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({ type: "SET_SERVER_RESPONSE", payload: msg });
    }
  };

  // 7. Check authentication
  const checkAuth = async (token: string) => {
    if (isEmpty(token)) return;
    try {
      await axios.post(
        "/check-auth",
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err: unknown) {
      const msg = getError(err as AxiosError);
      if (msg === "jwt expired") dispatch({ type: "SIGN_OUT_SUCCESS" });
    }
  };

  // 8. Send generic form email
  const sendFormEmail = async (bilet: string, values: any, locale: string) => {
    try {
      const { data } = await axios.post<any>("/send-form", {
        bilet,
        locale,
        ...values,
      });
      if (data.sent === "ok")
        dispatch({ type: "SET_SERVER_RESPONSE", payload: "Message sent" });
    } catch (err: unknown) {
      dispatch({ type: "SET_SERVER_RESPONSE", payload: getError(err) });
    }
  };

  // 9. Get licence
  const getLicence = async (values: any, lic: string) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post<any>("/lic", {
        ...values,
        lic,
      });
      if (!isEmpty(data)) dispatch({ type: "LICENCE", payload: data.lic });
      else dispatch({ type: "SET_SERVER_RESPONSE", payload: "WRONG_LICENCE" });
    } catch (err: unknown) {
      const msg = getError(err);
      if (msg === "jwt expired") dispatch({ type: "SIGN_OUT_SUCCESS" });
      dispatch({ type: "SET_SERVER_RESPONSE", payload: msg });
    }
  };
  const getUsersData = async () => {
    try {
      const token = getAuthToken();
      const { data } = await axios.post<any>(
        "/getting-user-data",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setValues({ ...data, password: data.pwd, repassword: data.pwd });
    } catch (error: unknown) {
      console.error("Error fetching user data:", getError(error));
    }
  };
  // Effects for auth and admin
  // useEffect(() => {
  //   const stored = getFromLocalStorage<{ token: string }>("user");
  //   if (stored?.token) {
  //     dispatch({ type: "LOGIN", payload: stored });
  //     checkAuth(stored.token as string);
  //   }
  // }, []);

  const value: AppContextType = {
    ...state,
    loginUser,
    sendPass,
    profile,
    checkAuth,
    fetchUsers,
    createUser: async (user) =>
      dispatch({ type: "ADD_USER", payload: user as ForumUserDto }),
    updateUser: async (user) =>
      dispatch({ type: "UPDATE_USER", payload: user }),
    deleteUser: async (id) => dispatch({ type: "DELETE_USER", payload: id }),
    getCountries: fetchCountries,
    getIpData: fetchIp,
    getUserData,
    sendFormEmail,
    getLicence,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useUserStateDispatch = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useUserStateDispatch must be used within UserProvider");
  return ctx;
};
