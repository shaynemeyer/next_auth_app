"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { z } from "zod";

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
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
};
