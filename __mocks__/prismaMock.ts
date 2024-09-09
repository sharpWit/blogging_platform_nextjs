import { PrismaClient } from "@prisma/client";

const prismaMock = {
  post: {
    findMany: jest.fn(),
  },
};

export default prismaMock as unknown as PrismaClient;
