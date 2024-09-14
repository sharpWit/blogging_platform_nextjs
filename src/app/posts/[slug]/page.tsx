import { NextPage } from "next";
import prisma from "@/lib/prisma";
import { parseISO, format } from "date-fns";
import Container from "@/components/container";
import CategoryLabel from "../__components/category";
interface Props {
  params: { slug: string };
}
const page: NextPage<Props> = async ({ params }) => {
  const slug = params.slug ?? "";
  // console.log("SLUG: ", slug);

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // console.log("POST: ", post);

  return (
    <Container className="!pt-0">
      <div className="mx-auto max-w-screen-md ">
        <div className="flex justify-center">
          <CategoryLabel categories={null} />
        </div>

        <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          {post?.title}
        </h1>

        <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0">
              {/* {AuthorimageProps && (
                <Link href={`/author/${post.author.slug.current}`}>
                  <Image
                    src={AuthorimageProps.src}
                    alt={post?.author?.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="40px"
                  />
                </Link>
              )} */}
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-400">
                Saeed
                {/* <Link href={`/author/${post.author.slug.current}`}>
                  {post}
                </Link> */}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={post?.createAt?.toString()}
                >
                  {format(parseISO("2024-09-14T20:27:14"), "MMMM dd, yyyy")}
                </time>
                <span>· {"5"} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl pt-8">
        <p className="text-lg"> {post?.content}</p>
      </div>
    </Container>
  );
};

export default page;
