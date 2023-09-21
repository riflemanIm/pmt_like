import React, { useReducer, useContext, createContext } from "react";
import isEmpty from "../helpers";
const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      if (typeof window !== "undefined")
        window.localStorage.setItem(
          "user",
          JSON.stringify({ ...action.payload })
        );

      return {
        ...state,
        user: { ...action.payload },
        isAuthenticated: true,
        loaded: true,
        serverResponse: null,
      };

    case "SIGN_OUT_SUCCESS":
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
      }
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
      if (typeof window !== "undefined" && !isEmpty(action.payload.data)) {
        window.localStorage.setItem(
          "user",
          JSON.stringify({ ...action.payload.data })
        );
      }
      return {
        ...state,
        loaded: true,
        user: !isEmpty(action.payload.data)
          ? { ...state.user, ...action.payload.data }
          : {
              ...state.user,
            },
        isAuthenticated: !isEmpty(action.payload.data)
          ? true
          : !!state.isAuthenticated,
        serverResponse: action.payload.serverResponse,
      };
    case "RESCUE_LICENCE":
      return {
        ...state,
        rescueLicence: action.payload,
        loaded: true,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function UserProvider({ children }) {
  let user = {};
  if (typeof window !== "undefined") {
    user = JSON.parse(window.localStorage.getItem("user")) ?? {};
  }
  const isAuthenticated = user.token != null;

  const [userState, userDispatch] = useReducer(userReducer, {
    isAuthenticated,
    user,
    serverResponse: null,
    rescueLicence: null,
    loaded: true,
  });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserStateDispatch() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserStateDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserStateDispatch };
