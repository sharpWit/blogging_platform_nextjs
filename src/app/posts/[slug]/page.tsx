import Image from "next/image";
import { NextPage } from "next";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { IPosts } from "../__types/posts";
import { getURL } from "@/services/getURL";
import Container from "@/components/container";
import CategoryLabel from "../__components/category";
import { calculateReadingTime } from "@/lib/utils";

const fetchPost = unstable_cache(
  async (slug: string) => {
    return await prisma.post.findUnique({
      where: { slug: slug },
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
  ["post"],
  { revalidate: 3600, tags: ["post"] }
);

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
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

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: { slug: string };
}

const PostPage: NextPage<Props> = async ({ params }) => {
  const slug = params.slug ?? "";

  let postData: IPosts | null;
  const url = `${getURL()}/api/posts/${slug}`;
  if (process.env.NODE_ENV === "production") {
    // Fetch data directly with Prisma during the build process (SSG/SSR)
    postData = await fetchPost(slug);
  } else {
    // During development, use the API route
    const res = await fetch(url);
    if (!res.ok) throw new Error("There was an error with your request!");
    postData = await res.json();
  }

  if (!postData) notFound();

  const readingTime = calculateReadingTime(postData.content || "");

  return (
    <Container className="!pt-0">
      <div className="mx-auto max-w-screen-md">
        {/* Category Label */}
        <div className="flex justify-center">
          <CategoryLabel category={postData.category?.name} />
        </div>

        {/* Post Title */}
        <h1 className="text-brand-primary mb-3 mt-2 text-center text-4xl font-bold tracking-tight dark:text-white lg:text-5xl">
          {postData.title}
        </h1>

        {/* Author, Date, and Reading Time */}
        <div className="mt-3 flex justify-center space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={`/images/posts/${
                  postData.featuredImage || "default-image.png"
                }`}
                alt={postData.author?.name || "Author"}
                className="rounded-full object-cover"
                fill
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-300">
                {postData.author?.name || "Unknown Author"}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={postData.createAt.toLocaleString()}
                >
                  {format(postData?.createAt, "MMMM dd, yyyy")}
                </time>
                <span>· {readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-6">
          {postData.featuredImage && (
            <Image
              src={`/images/posts/${postData.featuredImage}`}
              alt={postData.title}
              className="rounded-lg object-cover"
              width={1200}
              height={675}
              priority
            />
          )}
        </div>

        {/* Post Content */}
        <div className="mx-auto max-w-screen-xl pt-8">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {postData.content}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {postData.tags && (
            <div className="flex gap-2">
              <p className="text-gray-500 dark:text-gray-400">Tags:</p>
              <ul className="flex flex-wrap gap-2">
                <li className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {postData.tags.name}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PostPage;
