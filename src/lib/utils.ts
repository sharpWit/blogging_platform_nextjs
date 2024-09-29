import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// A cn helper to make it easier to conditionally add Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content?.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
};
