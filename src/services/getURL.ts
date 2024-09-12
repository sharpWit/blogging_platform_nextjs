export const getURL = (): string => {
  const url =
    process.env.NEXT_PUBLIC_API_URL || // Custom API URL (e.g., set in Vercel)
    process.env.VERCEL_URL || // Vercel's automatically generated URL
    "http://localhost:3000"; // Local development fallback

  // Ensure the URL starts with "http" or "https"
  return url.startsWith("http") ? url : `https://${url}`;
};
