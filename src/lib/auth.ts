import { z } from "zod";
import type { Route } from "next";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

// validate sign-in credentials
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

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error
    );
    throw new Error("Failed to retrieve user.");
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login" as Route,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided!"); // Log missing credentials
          return null;
        }

        const { success, data, error } = signInSchema.safeParse(credentials);

        if (!success) {
          console.error("Validation failed:", error.errors); // Log validation errors
          return null;
        }

        const { email, password } = data;

        try {
          const user = await getUserByEmail(email);
          if (!user) {
            console.error("User not found.");
            return null;
          }

          const passwordsMatch = await compare(password, user.password);
          if (passwordsMatch) {
            return user;
          } else {
            console.error("Invalid password");
            return null;
          }
        } catch (error) {
          console.error(
            "Authorization error:",
            error instanceof Error ? error.message : error
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const { id } = user as User;
        token.id = id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.id) {
        session.user = {
          ...(session.user || {}),
          id: token.id as string,
        };
      }
      return session;
    },
  },
};
