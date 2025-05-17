import React, { useEffect } from "react";
import { useUserStateDispatch } from "../src/context/UserContext";
import { checkAuth } from "../src/actions/user";
import Users from "../src/admin/pages/user";
import Router from "next/router";

export default function Admin({ countries, menu }) {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();

  useEffect(() => {
    checkAuth(userDispatch, user.token);
  }, []);
  useEffect(() => {
    //console.log("user", user);
    if (!isAuthenticated) {
      Router.push("/signin");
    }
  }, [isAuthenticated]);
  return <Users />;
}
