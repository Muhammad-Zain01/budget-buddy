import { render } from "@react-email/components";
import Verification from "@/email/verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to: string, subject: string, html: any) => {
  return await resend.emails.send({
    from: `${process.env.EMAIL_TITLE} <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html,
  });
};

export const sendVerificationEmail = async (
  to: string,
  code: string,
  name: string
) => {
  const subject = "Email Verification";
  const html = await render(
    <Verification verificationCode={code} name={name} />
  );
  const response = await sendEmail(to, subject, html);
  console.log(response);
  return response;
};

export default sendEmail;