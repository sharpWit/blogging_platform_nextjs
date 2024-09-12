"use client";

import { z } from "zod";

// Create the schema to validate sign-in credentials
export const signInSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Must have at least 3 characters" })
    .max(70, { message: "Must not be more than 70 characters" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 characters" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
