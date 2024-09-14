import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { getURL } from "@/services/getURL";
import { fetchWithErrorHandling } from "@/lib/utils";
import Container from "@/components/container";
import PostList from "./__components/postlist";
import Link from "next/link";

const fetchPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

const PostsPage = async () => {
  let postsData;
  const url = `${getURL()}/api/posts`;
  if (process.env.NODE_ENV === "production") {
    // Fetch data directly with Prisma during the build process (SSG/SSR)
    postsData = await fetchPosts();
  } else {
    // During development, use the API route
    postsData = await fetchWithErrorHandling<Post[]>(url, {
      cache: "no-cache",
    });
  }

  return (
    <>
      {postsData && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {postsData.map((post) => (
              <PostList
                key={post.id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {postsData.slice(2, 14).map((post) => (
              <PostList key={post.id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/posts"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
};

export default PostsPage;
