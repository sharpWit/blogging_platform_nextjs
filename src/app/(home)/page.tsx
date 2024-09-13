import Link from "next/link";
import type { Route } from "next";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Container>
      <main className="flex flex-col items-start justify-evenly mt-16 md:flex-row">
        <div>
          <h1>Home</h1>
          <p>Contents</p>
        </div>
        <div className="h-screen">
          <div>
            <h1 className="font-bold mb-4">TOP CATEGORIES</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
              <Button
                variant={"secondary"}
                className="hover:scale-110 transition-all"
                asChild
              >
                <Link href={"/posts" as Route}>Posts</Link>
              </Button>
            </div>

            <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
          </div>
        </div>
      </main>
    </Container>
  );
}
