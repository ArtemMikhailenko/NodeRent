import { useCallback } from "react";

export const useResetPassword = () => {
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    fetch("https://api.noderent.pro/user/sendPasswordResetLink", {
      method: "POST",
      body: JSON.stringify({
        email: event.target[0].value,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
      });
  }, []);

  return { onSubmit };
};
