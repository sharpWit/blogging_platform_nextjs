import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { getURL } from "@/services/getURL";
import { fetchWithErrorHandling } from "@/lib/utils";

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
    <section className="h-screen px-8 pt-4">
      <div className="bg-yellow-100 p-4">
        {postsData.map((post) => (
          <ul
            key={post.id}
            className="bg-card max-w-md w-full p-4 border mb-2 shadow-md"
          >
            <li className="p-1">
              <h3 className="font-bold text-lg">{post.title}</h3>
            </li>
            <li className="p-1">
              <p className="font-light">{post.content}</p>
            </li>
          </ul>
        ))}
      </div>
    </section>
  );
};

export default PostsPage;
