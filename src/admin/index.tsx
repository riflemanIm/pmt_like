import React, { lazy } from "react";
import { HashRouter, Route, Navigate, Routes } from "react-router-dom";
// components
import Dashboard from "./layout/MinimalLayout";

// context
import Loadable from "./components/Loadable";

const UserList = Loadable(lazy(() => import("./pages/user")));
const UserAdd = Loadable(lazy(() => import("./pages/user/AddUser")));
const UserEdit = Loadable(lazy(() => import("./pages/user/EditUser")));
const UserEditNet = Loadable(lazy(() => import("./pages/user/EditUserNet")));
const UserReport = Loadable(lazy(() => import("./pages/user/UserReport")));

export default function AppAdmin(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<Dashboard />}>
          {/* ----------------- user ----------------- */}
          <Route path="user" element={<Navigate to="user/list" />} />
          <Route path="user/list" element={<UserList />} />
          <Route path="user/report" element={<UserReport />} />
          <Route path="user/add" element={<UserAdd />} />
          <Route path="user/:id/edit" element={<UserEdit />} />
          <Route path="user/:id/editNet" element={<UserEditNet />} />
          <Route path="user/:id" element={<UserEdit />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
