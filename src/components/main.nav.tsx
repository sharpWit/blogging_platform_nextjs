"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import { Icons } from "./icons";
import { POSTS } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {/* Top row */}
      <div className="flex justify-between items-center flex-1">
        {/* Logo */}
        <Link href={"/" as Route}>
          <div className="flex items-center justify-between w-[108px] text-primary-foreground">
            <Icons.logo className="h-6 w-6" />
            <h1 className="text-lg font-semibold">Sharpwit</h1>
          </div>
        </Link>

        {/* Lightness & RSS */}
        <div className="flex items-center justify-between w-20">
          <ModeToggle />
          <Link href={"/rss" as Route}>
            <Icons.rss className="h-6 w-6 text-primary-foreground" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 self-start">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {POSTS.map((post) => (
                    <ListItem
                      key={post.title}
                      title={post.title}
                      href={post.href}
                    >
                      {post.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={"/about" as Route} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
