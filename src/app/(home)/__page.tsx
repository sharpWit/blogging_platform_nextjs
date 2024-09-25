"use client";

import { FormEvent } from "react";
import LoginForm from "./__components/login-form";

const page = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    data: {
      email: string;
      password: string;
    }
  ) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div className="container bg-muted p-4">
      <h1 className="mb-4 font-bold text-xl">Home</h1>
      <div className="border max-w-md w-full p-3 rounded-md">
        <LoginForm onHandleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default page;
