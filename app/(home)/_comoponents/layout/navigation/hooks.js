"use client";

import { useMemo, useEffect, useState, useCallback, use } from "react";
import { ROUTES } from "./constants";
import { getCart } from "../../../hooks/helpers";
import { AuthContext } from "../../../../_context/auth/auth-provider";

export const useNavigation = () => {
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { user, isLoggedIn, logout } = use(AuthContext);

  const currentPage = useMemo(
    () => (isClient ? window?.location?.pathname : undefined),
    [isClient],
  );

  const routes = useMemo(
    () =>
      isLoggedIn
        ? Object.values(ROUTES)
        : Object.values(ROUTES).filter((item) => !item.guarded),
    [isLoggedIn],
  );

  const handleLogout = useCallback(async () => {
    const result = await (
      await fetch("https://api.noderent.pro/user/logout", {
        method: "GET",
        credentials: "include",
      })
    ).json();

    if (result.status === "success") {
      logout();
    } else {
      alert(res.msg);
    }
  }, [logout]);

  const goToLogin = useCallback(() => (window.location.href = "log-in"), []);

  useEffect(() => {
    setIsClient(true);
    setCartCount(getCart().length);

    const callback = () => setCartCount(getCart().length);

    window.addEventListener("storage", callback);

    return () => window.removeEventListener("storage", callback);
  }, []);

  return {
    routes,
    currentPage,
    cartCount,
    isLoggedIn,
    email: user?.email,
    logout: handleLogout,
    goToLogin,
  };
};
