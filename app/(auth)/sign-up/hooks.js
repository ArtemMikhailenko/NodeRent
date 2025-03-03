import { useRef, useCallback } from "react";

export const useSignUp = () => {
  const passwordRef = useRef(null);
  const passwordRepeatRef = useRef(null);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    const response = await (
      await fetch("https://api.noderent.pro/user/signupViaEmail", {
        method: "POST",
        body: JSON.stringify({
          email: event.target[0].value,
          password: event.target[1].value,
          password_re_entrered: event.target[2].value,
          telegram: event.target[3].value,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      alert(response.msg);
      window.location.href = "/log-in";
    } else {
      alert(response.msg);
    }
  }, []);

  const validatePasswordsMatch = useCallback(() => {
    if (passwordRef.current.value !== passwordRepeatRef.current.value) {
      passwordRepeatRef.current.setCustomValidity("Passwords Don't Match");
    } else {
      passwordRepeatRef.current.setCustomValidity("");
    }
  }, []);

  return { passwordRef, passwordRepeatRef, onSubmit, validatePasswordsMatch };
};
