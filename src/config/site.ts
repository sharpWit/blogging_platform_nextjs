type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    linkedin: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Sharpwit Blog",
  description:
    "An Open source Blog platform based on Next.js 14 with shadcn/ui, prisma and postgres.",
  url:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.VERCEL_URL ||
    "https://blogging-platform-nextjs.vercel.app",
  links: {
    linkedin: "https://www.linkedin.com/in/saeed-khosravi-me/",
    github: "https://github.com/sharpWit",
  },
};
