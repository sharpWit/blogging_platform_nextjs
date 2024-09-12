import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { getURL } from "@/services/getURL";
import { fetchWithErrorHandling } from "@/lib/utils";

const fetchPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany();
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

const PostsPage = async () => {
  let postsData: Post[];
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
    <section>
      <div>
        <ul>
          {postsData.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostsPage;
