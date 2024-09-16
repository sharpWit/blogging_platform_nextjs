import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Timeout mechanism to avoid hanging requests
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number = 8000
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

// Reusable and encapsulated error handling logic
export const fetchWithErrorHandling = async <T>(
  url: string,
  options: RequestInit = {},
  timeout: number = 8000
): Promise<T> => {
  try {
    const response = await fetchWithTimeout(url, { ...options }, timeout);

    // console.log("RES: ", response);
    // Check if response is not ok and handle errors accordingly
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(`Resource not found at ${url}`);
        case 500:
          throw new Error("Internal Server Error");
        case 401:
          throw new Error("Unauthorized access - please log in");
        case 403:
          throw new Error("Forbidden - you do not have access");
        case 429:
          throw new Error("Too many requests - slow down");
        default:
          throw new Error(
            `Unexpected error: ${response.statusText} (${response.status})`
          );
      }
    }

    // Attempt to parse the response body as JSON
    const data: T = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error fetching from ${url}:`, err.message);
      throw err; // Re-throw the error after logging it
    } else {
      console.error(`Unknown error occurred:`, err);
      throw new Error("An unknown error occurred during the fetch request.");
    }
  }
};

// A cn helper to make it easier to conditionally add Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content?.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
};
