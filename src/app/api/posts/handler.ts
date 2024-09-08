import prisma from "@/lib/prisma";

export async function getPostsHandler() {
  try {
    const posts = await prisma.post.findMany();
    return {
      success: true,
      message: "List Data Post",
      data: posts,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
