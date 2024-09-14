import { genSaltSync, hashSync } from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const saltRounds = 10;
  const plainPassword = "s0//P4$$w0rD";
  const salt = genSaltSync(saltRounds);
  const hashedPassword = hashSync(plainPassword, salt);

  // Create categories
  const category1 = await prisma.category.upsert({
    where: { name: "Technology" },
    update: {},
    create: { name: "Technology" },
  });

  const category2 = await prisma.category.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const category3 = await prisma.category.upsert({
    where: { name: "Health" },
    update: {},
    create: { name: "Health" },
  });

  // Create tags
  const tag1 = await prisma.tag.upsert({
    where: { name: "Tech" },
    update: {},
    create: { name: "Tech" },
  });

  const tag2 = await prisma.tag.upsert({
    where: { name: "Space" },
    update: {},
    create: { name: "Space" },
  });

  const tag3 = await prisma.tag.upsert({
    where: { name: "Medicine" },
    update: {},
    create: { name: "Medicine" },
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
          slug: "tech-innovations-in-2024",
          content: "Exploring the latest tech innovations in the coming year.",
          published: true,
          categoryId: category1.id,
          tagId: tag1.id,
        },
        {
          title: "The Universe and Beyond",
          slug: "the-universe-and-beyond",
          content: "A deep dive into space exploration and discoveries.",
          published: true,
          categoryId: category2.id,
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
          slug: "the-future-of-medicine",
          content: "How technology is changing the healthcare industry.",
          published: false,
          categoryId: category3.id,
          tagId: tag3.id,
        },
        {
          title: "Artificial Intelligence",
          slug: "artificial-intelligence",
          content: "Understanding AI and its impact on society.",
          published: true,
          categoryId: category1.id,
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
          slug: "climate-change-and-science",
          content:
            "Scientific research on climate change and its global impact.",
          published: true,
          categoryId: category2.id,
          tagId: tag2.id,
        },
        {
          title: "Breakthroughs in Health Science",
          slug: "breakthroughs-in-health-science",
          content: "Innovations in health and medicine in the past decade.",
          published: false,
          categoryId: category3.id,
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
            slug: post.slug,
            content: post.content,
            published: post.published,
            category: { connect: { id: post.categoryId } }, // Updated relation
            tags: { connect: { id: post.tagId } }, // Updated relation
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
