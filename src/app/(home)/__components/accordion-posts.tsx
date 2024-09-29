"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "./accordionPosts.module.scss";
import { IPosts } from "@/app/posts/__types/posts";

interface Props {
  posts: IPosts[];
}

const AccordionPosts: FC<Props> = ({ posts }) => {
  const [randomPosts, setRandomPosts] = useState<IPosts[]>([]);

  const shuffleArray = (array: IPosts[]) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() })) // add a random key
      .sort((a, b) => a.sort - b.sort)
      .map((item) => ({ ...item }));
  };

  useEffect(() => {
    const shuffledPosts = shuffleArray(posts);
    setRandomPosts(shuffledPosts.slice(0, Math.min(posts.length, 5)));
  }, [posts]);

  return (
    <div className="w-full hidden xl:block">
      <ul className={`${styles.accordionContainer} rounded-md shadow-md`}>
        {randomPosts.map((post) => (
          <li
            key={post.id}
            className={styles.accordionItem}
            style={{
              backgroundImage: `url(/images/posts/${post.featuredImage})`,
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
