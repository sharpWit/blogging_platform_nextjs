import { genSaltSync, hashSync } from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const saltRounds = 10;
  const plainPassword = "s0//P4$$w0rD";
  const salt = genSaltSync(saltRounds);
  const hashedPassword = hashSync(plainPassword, salt);

  // Create tags
  const tag1 = await prisma.tag.upsert({
    where: { name: "Technology" },
    update: {},
    create: { name: "Technology" },
  });

  const tag2 = await prisma.tag.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const tag3 = await prisma.tag.upsert({
    where: { name: "Health" },
    update: {},
    create: { name: "Health" },
  });

  // Manually add users and posts
  const users = [
    {
      name: "Saeed Khosravi",
      email: "khosravi.webmaster@gmail.com",
      password: hashedPassword, // Hashed password
      posts: [
        {
          title: "Tech Innovations in 2024",
          content: "Exploring the latest tech innovations in the coming year.",
          published: true,
          tagId: tag1.id,
        },
        {
          title: "The Universe and Beyond",
          content: "A deep dive into space exploration and discoveries.",
          published: true,
          tagId: tag2.id,
        },
      ],
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword, // Hashed password
      posts: [
        {
          title: "The Future of Medicine",
          content: "How technology is changing the healthcare industry.",
          published: false,
          tagId: tag3.id,
        },
        {
          title: "Artificial Intelligence",
          content: "Understanding AI and its impact on society.",
          published: true,
          tagId: tag1.id,
        },
      ],
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: hashedPassword, // Hashed password
      posts: [
        {
          title: "Climate Change and Science",
          content:
            "Scientific research on climate change and its global impact.",
          published: true,
          tagId: tag2.id,
        },
        {
          title: "Breakthroughs in Health Science",
          content: "Innovations in health and medicine in the past decade.",
          published: false,
          tagId: tag3.id,
        },
      ],
    },
  ];

  // Loop through users and create them with posts
  for (const userData of users) {
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        posts: {
          create: userData.posts.map((post) => ({
            title: post.title,
            content: post.content,
            published: post.published,
            tagId: post.tagId,
          })),
        },
      },
    });
  }

  console.log("Seeding completed!");
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
