import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedInStorage, setIsLoggedInStorage] = useState(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    const persistedValue =
      typeof window !== "undefined"
        ? window.localStorage.getItem("IS_LOGGED_IN")
        : null;

    return persistedValue !== null ? JSON.parse(persistedValue) : false;
  });

  const getSession = useCallback(async () => {
    const response = await (
      await fetch("https://api.noderent.pro/sessionInfo", {
        method: "GET",
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      setUser(response.user_data);
      localStorage.setItem("IS_LOGGED_IN", "true");
    } else {
      setUser(null);
      setIsLoggedInStorage(false);
      localStorage.setItem("IS_LOGGED_IN", "false");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedInStorage(false);
    localStorage.setItem("IS_LOGGED_IN", "false");
    window.location.href = "/";
  }, []);

  useEffect(() => {
    getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout, isLoggedIn: !!user || isLoggedInStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
