import { useCallback, useEffect, useState, useMemo, useRef } from "react";

import { MetaMaskSDK } from "@metamask/sdk";

export const useLogIn = () => {
  const [isClient, setIsClient] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const metamaskSDK = useRef(null);

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

  const handleCaptchaChange = useCallback((event) => setCaptcha(event), []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (captcha) {
        const response = await (
          await fetch("https://api.noderent.pro/user/signinViaEmail", {
            method: "POST",
            body: JSON.stringify({
              email: event.target[0].value,
              password: event.target[1].value,
              "g-recaptcha-response": captcha,
            }),
            credentials: "include",
          })
        ).json();

        if (response.status === "success") {
          window.location = "/";
        } else {
          alert(response.msg);
        }
      }
    },
    [captcha],
  );

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

  const loginWithMetamask = useCallback(async () => {
    if (!window.ethereum) {
      alert("metamask is not installed");
    }

    const messageResponse = await (
      await fetch(
        "https://api.noderent.pro/user/siginViaMetamskOrTrustWalletGetMessage",
        {
          method: "GET",
          credentials: "include",
        },
      )
    ).json();

    const signature = await metamaskSDK.current.connectAndSign({
      msg: messageResponse.message,
    });

    const address = (await metamaskSDK.current.connect())[0];

    const response = await (
      await fetch(
        "https://api.noderent.pro/user/siginViaMetamskOrTrustWalletVerify",
        {
          method: "POST",
          body: JSON.stringify({
            signature,
            address,
          }),
          credentials: "include",
        },
      )
    ).json();

    if (response.status === "success") {
      window.location.href = "/";
    } else {
      alert(response.msg);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    metamaskSDK.current = new MetaMaskSDK();
  }, []);

  useEffect(() => {
    if (params?.email && params?.token) {
      verifyEmail(params);
    }
  }, [verifyEmail, params]);

  return { onSubmit, loginWithGoogle, loginWithMetamask, handleCaptchaChange };
};
