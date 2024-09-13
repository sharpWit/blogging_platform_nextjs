import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getPostsHandler = async () => {
  try {
    const posts = await prisma.post.findMany({});

    if (!posts) notFound();

    return {
      success: true,
      message: "List of posts retrieved successfully",
      data: posts,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
