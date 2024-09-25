import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { getURL } from "@/services/getURL";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { IPosts } from "../posts/__types/posts";
import PostList from "../posts/__components/postlist";

const fetchPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createAt: true,
        slug: true,
        featuredImage: true,
        excerpt: true,
        views: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

export default async function HomePage() {
  let postsData: IPosts[];
  const url = `${getURL()}/api/posts`;
  if (process.env.NODE_ENV === "production") {
    // Fetch data directly with Prisma during the build process (SSG/SSR)
    postsData = await fetchPosts();
  } else {
    // During development, use the API route
    const res = await fetch(url);
    if (!res.ok) throw new Error("There was an error with your request!");
    postsData = await res.json();
  }

  if (!postsData) notFound();

  return (
    <Container>
      <main className="flex flex-col items-start justify-evenly mt-4 md:flex-row">
        <div>
          <h1 className="p-2 mb-2 font-bold text-xl">Home</h1>
          <div>
            <div className="flex flex-col space-y-4 ">
              {postsData &&
                postsData.map((post) => (
                  <PostList
                    key={post.id}
                    post={{
                      ...post,
                      author: post.author,
                      category: post.category,
                      tags: post.tags,
                    }}
                    aspect="landscape"
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="h-screen">
          <div>
            <h1 className="font-bold mt-4 mb-4">TOP CATEGORIES</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
              <Button
                variant="secondary"
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
