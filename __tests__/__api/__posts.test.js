import prismaMock from "../../__mocks__/prismaMock";
import { getPostsHandler } from "../../src/app/api/posts/handler";

jest.mock("../../src/lib/prisma", () => prismaMock);

describe("getPostsHandler", () => {
  test("should fetch posts successfully", async () => {
    const mockPosts = [
      {
        id: 1,
        title: "The Future of Tech",
        content: "This is a post about the future of technology.",
      },
      {
        id: 2,
        title: "Exploring the Universe",
        content: "A post about the vastness of the universe.",
      },
    ];
    prismaMock.post.findMany.mockResolvedValue(mockPosts);

    const result = await getPostsHandler();

    expect(result).toEqual({
      success: true,
      data: mockPosts,
      message: "List of posts retrieved successfully",
    });
  });

  test("should handle errors from prisma", async () => {
    prismaMock.post.findMany.mockRejectedValue(new Error("Database error"));

    const result = await getPostsHandler();

    expect(result).toEqual({
      success: false,
      message: "Database error",
    });
  });
});
