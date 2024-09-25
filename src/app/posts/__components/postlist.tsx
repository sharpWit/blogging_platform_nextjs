import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { CircleUserRound } from "lucide-react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import CategoryLabel from "./category";
import { IPosts } from "../__types/posts";

interface Props {
  post: IPosts;
  aspect?: string;
}
export default function PostList({ post, aspect }: Props) {
  return (
    <>
      <div className="group cursor-pointer">
        <div className="overflow-hidden rounded-md bg-muted-foreground transition-all hover:scale-105">
          <Link
            className={cn(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            href={`/posts/${post.slug}`}
          >
            {post.featuredImage ? (
              <Image
                src={`/images/posts/${post?.featuredImage}`}
                alt={post.title || "Thumbnail"}
                priority={true}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-muted-foreground">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div>
          <div>
            <CategoryLabel category={post.category?.name} />
            <h2 className="text-2xl font-semibold leading-snug tracking-tight mt-2 ">
              <Link href={`/posts/${post.slug}`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900"
                >
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  <Link href={`/posts/${post.slug}`}>
                    {post.excerpt || "Thank you for reading this post."}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-muted-foreground">
              {/* Author */}
              <Link href={`/posts/${post.slug}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    {((post?.author && post.author.name) || "Saeed") && (
                      <CircleUserRound />
                    )}
                  </div>
                  <span className="truncate text-sm">
                    {post?.author?.name || "Saeed"}
                  </span>
                </div>
              </Link>

              <span className="text-xs text-muted-foreground">&bull;</span>

              {/* DATE */}
              <time
                className="truncate text-sm"
                dateTime={post?.createAt.toLocaleString()}
              >
                {format(post?.createAt, "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
