import Link from "next/link";
import type { Route } from "next";

export default function NotFound() {
  return (
    <section className="grid place-content-center h-screen max-w-72 w-full p-4 mx-auto">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="mb-4">This page you are looking for does not exist.</p>
      <Link href={"/" as Route}>Return Home</Link>
    </section>
  );
}
