import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Home</h1>
      <Link href="/posts">Posts</Link>
    </div>
  );
}
