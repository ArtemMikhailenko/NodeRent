import { useCallback, useEffect, useState, useMemo } from "react";

export const useLogIn = () => {
  const [isClient, setIsClient] = useState(false);

  const params = useMemo(() => {
    if (isClient) {
      const urlParams = new URLSearchParams(window.location.search);

      return {
        email: urlParams.get("submitEmail"),
        token: urlParams.get("submitToken"),
      };
    }
  }, [isClient]);

  const verifyEmail = useCallback(async ({ email, token }) => {
    const response = await (
      await fetch("https://api.noderent.pro/user/verifyEmail", {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
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
    if (params?.email && params?.token) {
      verifyEmail(params);
    }
  }, [verifyEmail, params]);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    const response = await (
      await fetch("https://api.noderent.pro/user/signinViaEmail", {
        method: "POST",
        body: JSON.stringify({
          email: event.target[0].value,
          password: event.target[1].value,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      window.location = "/";
    } else {
      alert(response.msg);
    }
  }, []);

  const loginWithGoogle = async () => {
    const response = await (
      await fetch("https://api.noderent.pro/user/oauth/google", {
        method: "GET",
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      window.location.href = response.url;
    } else {
      alert(response.msg);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { onSubmit, loginWithGoogle };
};
