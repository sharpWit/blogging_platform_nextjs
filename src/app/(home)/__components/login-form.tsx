"use client";

import React, { FC, FormEvent, useState } from "react";
import Button from "./button";

interface Props {
  onHandleSubmit: (
    event: FormEvent<HTMLFormElement>,
    formData: { email: string; password: string }
  ) => void;
}
const LoginForm: FC<Props> = ({ onHandleSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(e) =>
        onHandleSubmit(e, {
          email: email,
          password: password,
        })
      }
      className="flex flex-col p-2 space-y-2 bg-ring"
    >
      <input
        type="email"
        name="Email"
        autoComplete="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="Password"
        autoComplete="current-password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        type="submit"
        className="bg-primary text-primary-foreground max-w-xs w-full p-2 rounded-sm mx-auto"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
