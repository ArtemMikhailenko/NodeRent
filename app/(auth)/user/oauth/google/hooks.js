"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

export const useGoogleAuthPage = () => {
  const [isClient, setIsClient] = useState(false);

  const code = useMemo(
    () =>
      isClient
        ? new URLSearchParams(window.location.search)
            .get("code")
            .replace("%2F", "/")
        : undefined,
    [isClient],
  );

  const authThrowGoogle = useCallback(async (code) => {
    const response = await (
      await fetch("https://api.noderent.pro/user/oauth/google/getOauthData", {
        method: "POST",
        body: JSON.stringify({
          code,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      window.location.href = "/";
    } else {
      alert(response.msg);
    }
  }, []);

  useEffect(() => {
    if (code) {
      authThrowGoogle(code);
    }
  }, [authThrowGoogle, code]);

  useEffect(() => {
    setIsClient(true);
  }, []);
};
