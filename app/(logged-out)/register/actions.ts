"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { z } from "zod";
import { hash } from "bcrypt";
import { db } from "@/db/drizzle";
import { users } from "@/db/usersSchema";

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const newUserSchema = z
      .object({
        email: z.string().email(),
      })
      .and(passwordMatchSchema);

    const validatedData = newUserSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validatedData.success) {
      return {
        error: true,
        message: validatedData.error.issues[0].message ?? "An error occurred",
      };
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
    });
  } catch (e: any) {
    if (e.code === "23505") {
      return {
        error: true,
        message: "Email already in use",
      };
    }

    return {
      error: true,
      message: "An error occurred",
    };
  }
};
