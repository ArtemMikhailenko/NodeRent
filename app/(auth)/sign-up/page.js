"use client";

import { Link } from "../../_components/link/link";
import { Button } from "../../_components/button/button";
import { Input } from "../../_components/input/input";

import { useSignUp } from "./hooks";

export default function SignUp() {
  const { passwordRef, passwordRepeatRef, onSubmit, validatePasswordsMatch } =
    useSignUp();
  return (
    <div className="flex flex-col gap-4 text-center w-80 max-w-[calc(100vw-20px)]">
      <span className="flex justify-center text-xl">Sign up</span>
      <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
        <Input
          label="Email"
          autoComplete="email"
          placeholder="Email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="example@mail.com"
          required
        />
        <Input
          ref={passwordRef}
          onChange={validatePasswordsMatch}
          label="Password"
          autoComplete="password"
          placeholder="Password"
          type="password"
          title="password"
          required
        />
        <Input
          ref={passwordRepeatRef}
          onKeyUp={validatePasswordsMatch}
          label="Password repeat"
          autoComplete="password"
          placeholder="Password repeat"
          type="password"
          title="password repeat"
          required
        />
        <Input
          label="Telegram"
          placeholder="Telegram"
          title="telegram"
          required
        />
        <Button type="submit" size="xl">
          Sign up
        </Button>
      </form>
      <Link href="/log-in">Login</Link>
    </div>
  );
}
