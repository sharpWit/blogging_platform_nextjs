export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_BASE_URL
    : typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:" + process.env.PORT;
