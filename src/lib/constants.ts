import type { Route } from "next";

export const BASE_URL = "https://blogging-platform-nextjs.vercel.app";

export const POSTS: { title: string; href: string; description: string }[] = [
  {
    title: "React",
    href: "categories/reactjs" as Route,
    description:
      "Learn React.js and Next.js in a simple to understand articles",
  },
  {
    title: "Javascript",
    href: "categories/javascript" as Route,
    description: "Learn what are new in the javascript world",
  },
  {
    title: "CSS",
    href: "categories/styling" as Route,
    description: "Everything about CSS and the new features.",
  },
  {
    title: "Performance",
    href: "categories/performance" as Route,
    description: "How to make your next app Blazing fast",
  },
  {
    title: "Animaion",
    href: "categories/animaion" as Route,
    description:
      "Everything you need to know about animations. We are going to learn about animation library like framer motion, GSAP and many more.",
  },
  {
    title: "Career",
    href: "categories/career" as Route,
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
