"use client";

import "./styles.css";

import { useNavigation } from "./hooks";
import { DesktopNavigation } from "./_components/desktop-navigation/desktop-navigation";
import { MobileNavigation } from "./_components/mobile-navigation/mobile-navigation";

export const Navigation = () => {
  const { routes, currentPage, cartCount, isLoggedIn, logout, goToLogin } =
    useNavigation();
  return (
    <>
      {isLoggedIn !== null && typeof isLoggedIn !== "undefined" && (
        <>
          <DesktopNavigation
            routes={routes}
            currentPage={currentPage}
            isLoggedIn={isLoggedIn}
            logout={logout}
            cartCount={cartCount}
          />
          <MobileNavigation
            routes={routes}
            currentPage={currentPage}
            isLoggedIn={isLoggedIn}
            logout={logout}
            cartCount={cartCount}
            goToLogin={goToLogin}
          />
        </>
      )}
    </>
  );
};
