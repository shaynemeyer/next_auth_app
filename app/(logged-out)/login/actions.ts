"use server";

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/usersSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { z } from "zod";
import { compare } from "bcrypt";

export const loginWithCredentials = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token?: string;
}) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
  });

  const loginValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      token,
      redirect: false,
    });
  } catch (err) {
    return { error: true, message: "Invalid credentials" };
  }
};

export const preLoginCheck = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      error: true,
      message: "Invalid credentials",
    };
  } else {
    const passwordCorrect = await compare(password, user.password!);
    if (!passwordCorrect) {
      return {
        error: true,
        message: "Invalid credentials",
      };
    }
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
  };
};
