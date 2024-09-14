import prisma from "@/lib/prisma";
import { NextPage } from "next";

interface Props {
  params: { slug: string };
}
const page: NextPage<Props> = async ({ params }) => {
  const slug = params.slug ?? "";
  console.log("SLUG: ", slug);

  const post = await prisma.post.findUnique({
    where: { id: slug },
  });

  console.log("POST: ", post);

  return <div>page</div>;
};

export default page;
