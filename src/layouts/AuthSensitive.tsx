// src/components/AuthSensitive.tsx
"use client";

import { useEffect, useState } from "react";
import { useUserStateDispatch } from "../context/UserContext";
import { checkAuth } from "../actions/user";

export default function AuthSensitive({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const {
    userState: { isAuthenticated, user },
    userDispatch,
  } = useUserStateDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user.token) {
      checkAuth(userDispatch, user.token).finally(() => {
        setReady(true);
      });
    }
  }, [userDispatch, user.token]);

  if (!ready) return fallback;
  return <>{isAuthenticated ? children : fallback}</>;
}
