import Link from "next/link";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { IPosts } from "./__types/posts";
import { getURL } from "@/services/getURL";
import Container from "@/components/container";
import PostList from "./__components/post-list";

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

const PostsPage = async () => {
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

  return (
    <>
      {postsData && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
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
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {postsData.slice(2, 14).map((post) => (
              <PostList
                key={post.id}
                post={{
                  ...post,
                  author: post.author,
                  category: post.category,
                  tags: post.tags,
                }}
                aspect="square"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>View all Categories</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
};

export default PostsPage;
