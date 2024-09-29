import "../styles/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/header";
import { siteConfig } from "@/config/site";
import { inter } from "@/components/ui/fonts";
import { MainNav } from "@/components/main-nav";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextAuthProvider } from "@/providers/session-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Shadcnui",
    "Javascript",
    "Blog",
  ],
  authors: [
    {
      name: "Sharpwit",
      url: "https://github.com/sharpWit",
    },
  ],
  creator: "Sharpwit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader
          color="#16216a"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #16216a,0 0 5px #16216a"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <Header>
              <MainNav />
            </Header>
            <main className="pt-32 min-h-screen w-full">{children}</main>
            <Footer />
            <Toaster />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
