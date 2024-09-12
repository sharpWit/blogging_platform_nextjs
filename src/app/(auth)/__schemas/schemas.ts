"use client";

import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(70, "Email cannot exceed 50 characters")
    .trim(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
