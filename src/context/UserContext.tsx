import React, {
  useReducer,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import {
  saveToLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
} from "../helpers/storageHelpers";

// Типы для состояния и действий
interface User {
  token?: string;
  [key: string]: any;
}

interface UserState {
  isAuthenticated: boolean;
  user: User;
  serverResponse: any | null;
  licence: string | null;
  loaded: boolean;
}

type UserAction =
  | { type: "LOGIN"; payload: User }
  | { type: "SIGN_OUT_SUCCESS"; payload: any }
  | { type: "SET_USER"; payload: Partial<UserState> }
  | { type: "LOADING" }
  | {
      type: "SET_SERVER_RESPONSE";
      payload: { data: User; serverResponse: any };
    }
  | { type: "LICENCE"; payload: string };

// Создаем контекст
const UserContext = createContext<{
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
} | null>(null);

// Редьюсер для управления состоянием пользователя
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN":
      saveToLocalStorage("user", action.payload);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loaded: true,
        serverResponse: null,
      };

    case "SIGN_OUT_SUCCESS":
      removeFromLocalStorage("user");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loaded: true,
        serverResponse: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        ...action.payload,
        loaded: true,
      };

    case "LOADING":
      return {
        ...state,
        loaded: false,
      };

    case "SET_SERVER_RESPONSE":
      if (action.payload.data) {
        saveToLocalStorage("user", action.payload.data);
      }
      return {
        ...state,
        user: action.payload.data
          ? { ...state.user, ...action.payload.data }
          : state.user,
        isAuthenticated: !!action.payload.data || state.isAuthenticated,
        serverResponse: action.payload.serverResponse,
        loaded: true,
      };

    case "LICENCE":
      return {
        ...state,
        licence: action.payload,
        loaded: true,
      };

    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
}

// Провайдер состояния пользователя
interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const initialUser = getFromLocalStorage<User>("user") || {};
  const isAuthenticated = !!initialUser?.token;

  const [userState, userDispatch] = useReducer(userReducer, {
    isAuthenticated,
    user: initialUser,
    serverResponse: null,
    licence: null,
    loaded: true,
  });

  const value = useMemo(
    () => ({ userState, userDispatch }),
    [userState, userDispatch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Кастомный хук для состояния и dispatch
function useUserStateDispatch() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserStateDispatch must be used within a UserProvider");
  }
  return context;
}

// Экспортируем провайдер и хук
export { UserProvider, useUserStateDispatch };
