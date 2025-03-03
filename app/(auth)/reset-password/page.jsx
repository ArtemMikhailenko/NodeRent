"use client";

import { Button } from "../../_components/button/button";
import { Input } from "../../_components/input/input";

import { useResetPassword } from "./hooks";

export default function ResetPassword() {
  const { onSubmit } = useResetPassword();
  return (
    <div className="flex flex-col gap-4 text-center w-80 max-w-[calc(100vw-20px)]">
      <span className="flex justify-center text-xl">Reset password</span>
      <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
        <Input
          label="Email"
          autoComplete="email"
          placeholder="Email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="example@mail.com"
          required
        />
        <Button type="submit" size="xl">
          Reset password
        </Button>
      </form>
    </div>
  );
}
