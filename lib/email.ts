import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.MAILER_HOST || "localhost",
  port: Number(process.env.MAILER_PORT) || 587,
  auth: {
    user: process.env.MAILER_AUTH_USER || "",
    pass: process.env.MAILER_AUTH_PASS || "",
  },
});
