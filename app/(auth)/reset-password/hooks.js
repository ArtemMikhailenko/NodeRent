import { useCallback, useState } from "react";

export const useResetPassword = () => {
  const [captcha, setCaptcha] = useState(null);

  const handleCaptchaChange = useCallback((event) => setCaptcha(event), []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (captcha) {
        fetch("https://api.noderent.pro/user/sendPasswordResetLink", {
          method: "POST",
          body: JSON.stringify({
            email: event.target[0].value,
            "g-recaptcha-response": captcha,
          }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            alert(res.msg);
          });
      }
    },
    [captcha],
  );

  return { onSubmit, handleCaptchaChange };
};
