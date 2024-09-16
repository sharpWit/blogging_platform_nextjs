import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getPostHandler = async (slug: string) => {
  try {
    const post = prisma.post.findUnique({
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

    if (!post) notFound();

    return {
      success: true,
      message: "The post retrieved successfully",
      data: post,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
