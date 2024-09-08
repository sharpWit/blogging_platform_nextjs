import prisma from "../src/lib/prisma";

async function main() {
  // Create tags
  const tag1 = await prisma.tag.create({
    data: {
      name: "Technology",
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: "Science",
    },
  });

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Saeed Khosravi",
      email: "khosravi.webmaster@gmail.com",
      password: "securepassword", // This should be hashed in production
      posts: {
        create: [
          {
            title: "The Future of Tech",
            content: "This is a post about the future of technology.",
            published: true,
            tagId: tag1.id, // Associate with the 'Technology' tag
          },
          {
            title: "Exploring the Universe",
            content: "A post about the vastness of the universe.",
            published: false,
            tagId: tag2.id, // Associate with the 'Science' tag
          },
        ],
      },
    },
  });

  console.log("Seeded user and posts:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
