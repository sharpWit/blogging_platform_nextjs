import Link from "next/link";
import type { Route } from "next";
import LoginForm from "@/app/(auth)/__components/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen p-6">
      <div className="relative mx-auto flex w-full max-w-md flex-col space-y-2.5 p-3 md:-mt-32 border rounded-md drop-shadow-md">
        <div className="flex h-20 w-full items-end rounded-lg bg-violet-900 dark:bg-violet-950 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <h1 className="text-xl font-bold">
              <Link href={"/" as Route}>LOGO</Link>
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
