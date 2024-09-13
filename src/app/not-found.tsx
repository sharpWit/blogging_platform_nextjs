import Link from "next/link";
import type { Route } from "next";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={"/" as Route}>Return Home</Link>
    </div>
  );
}
