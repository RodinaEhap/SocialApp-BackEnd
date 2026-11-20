import nodemailer from "nodemailer";
import { getRequiredEnv } from "./environment";
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: getRequiredEnv("EMAIL_USER"),
      pass: getRequiredEnv("EMAIL_PASS"),
    },
  });

  const info = await transporter.sendMail({
    from: `<${getRequiredEnv("EMAIL_USER")}>`,
    to,
    subject,
    html,
  });
  return info;
};
