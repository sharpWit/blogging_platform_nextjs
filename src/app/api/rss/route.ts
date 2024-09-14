import { getURL } from "@/services/getURL";
import { getPostsHandler } from "./handler";

export async function GET() {
  const allBlogs = await getPostsHandler();

  const itemsXml =
    allBlogs.success && allBlogs.data
      ? allBlogs.data
          .map(
            (post) => `<item>
  <title>${post.title}</title>
  <link>${getURL()}/posts/${post.slug}</link>
  <description>${post.content || ""}</description>
  <pubDate>${new Date(post.createAt).toUTCString()}</pubDate>
  </item>`
          )
          .join("/n")
      : null;

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
            <title>Coding Jitsu</title>
            <link>${getURL()}</link>
            <description>This is my Technical Blog RSS feed</description>
            ${itemsXml}
        </channel>
      </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
