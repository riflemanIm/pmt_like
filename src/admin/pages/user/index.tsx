"use client";
import React from "react";
import UserList from "./UserList";
import { ManagementProvider } from "../../context/ManagementContext";

export default function Users() {
  return (
    <ManagementProvider>
      <UserList />
    </ManagementProvider>
  );
}
