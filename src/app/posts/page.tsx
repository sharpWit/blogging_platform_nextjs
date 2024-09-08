import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostResponse } from "./types/response";
import { BASE_URL } from "@/constants/base-url";

const PostsPage = async () => {
  const posts: PostResponse<Post> = await fetch(`${BASE_URL}/api/posts`)
    .then((res) => res.json())
    .catch();

  // console.log("POSTS: ", posts);

  if (!posts) {
    notFound();
  }

  return (
    <section>
      <div>
        {posts &&
          posts.data.map((items) => <li key={items.id}>{items.title}</li>)}
      </div>
    </section>
  );
};

export default PostsPage;
