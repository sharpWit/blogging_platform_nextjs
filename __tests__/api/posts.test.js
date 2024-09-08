import { getPostsHandler } from "../../src/app/api/posts/handler";
import prisma from "../../src/lib/prisma";

// Mock the prisma.post.findMany function
jest.mock("../../src/lib/prisma", () => ({
  post: {
    findMany: jest.fn(),
  },
}));

describe("getPostsHandler", () => {
  test("should handle errors from prisma", async () => {
    // Mock rejected value
    prisma.post.findMany.mockRejectedValue(new Error("Database error"));

    const result = await getPostsHandler();

    expect(result).toEqual({
      success: false,
      message: "Database error",
    });
  });
});
