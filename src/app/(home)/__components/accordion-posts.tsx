"use client";

import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./accordionPosts.module.scss";
import { IPosts } from "@/app/posts/__types/posts";

interface Props {
  posts: IPosts[];
}

const AccordionPosts: FC<Props> = ({ posts }) => {
  const [randomPosts, setRandomPosts] = useState<IPosts[]>([]);

  const shuffledPosts = useMemo(() => {
    const shuffledArray = (array: IPosts[]) => {
      return array
        .map((item) => ({ ...item, sort: Math.random() })) // Add a random sort key
        .sort((a, b) => a.sort - b.sort)
        .slice(0, Math.min(posts.length, 5)); // Limit to 5 posts
    };
    return shuffledArray(posts);
  }, [posts]);

  // Only update state when shuffledPosts changes
  useEffect(() => {
    setRandomPosts(shuffledPosts);
  }, [shuffledPosts]);

  return (
    <div className="w-full hidden xl:block">
      <ul className={`${styles.accordionContainer} rounded-md shadow-md`}>
        {randomPosts.map((post) => (
          <li
            key={post.id}
            className={styles.accordionItem}
            style={{
              backgroundImage: `url(/images/posts/${post.featuredImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link
              href={`/posts/${post.slug}`}
              className={styles.accordionTitle}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionPosts;
