import { render } from "@react-email/components";
import Plunk from "@plunk/node";
import Verification from "@/email/verification";

const sendEmail = async (to: string, subject: string, html: any) => {
  console.log("EMAIL_KEY", process.env.EMAIL_API_KEY);
  // @ts-ignore
  const plunk = new Plunk(process.env.EMAIL_API_KEY);

  return plunk.emails.send({
    to: to,
    subject: subject,
    body: html,
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
  console.log("Email Response ===>>", response);
  return response;
};

export default sendEmail;
