"use server";

import { z } from "zod";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email cannot exceed 50 characters")
    .trim(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

async function getUser(email: string): Promise<User> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("User does not exist!");
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authorizeUser = async (
  credentials: Record<"email" | "password", string> | undefined
): Promise<User | null> => {
  const validatedFields = schema.safeParse(credentials);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;
    const user = await getUser(email);

    if (!user) return null;

    const passwordsMatch = await compare(password, user.password);

    if (passwordsMatch) return user;
  }
  return null;
};
