import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import Verification from "@/email/verification";

const sendEmail = async (to: string, subject: string, html: string) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };
  return await transporter.sendMail(emailOptions);
};

export const sendVerificationEmail = async (to: string, code: string) => {
  const subject = "Email Verification";
  const html = await render(<Verification verificationCode={code} />);
  const response = await sendEmail(to, subject, html);
  console.log(response);
};

export default sendEmail;
