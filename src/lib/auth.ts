import { z } from "zod";
import type { Route } from "next";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

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

async function getUser(email: string): Promise<User> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      console.error("User does not exist!");
      throw new Error("User does not exist!");
    }
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
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

        const user = await getUser(email);
        if (!user) {
          return null;
        }

        try {
          const passwordsMatch = await compare(password, user.password);
          if (passwordsMatch) {
            return user;
          } else {
            console.error("Passwords do not match."); // Log password mismatch
          }
        } catch (error) {
          console.error("Error comparing passwords:", error); // Log comparison error
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
