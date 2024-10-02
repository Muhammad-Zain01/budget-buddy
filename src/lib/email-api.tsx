import { render } from "@react-email/components";
import sendEmail from "./email";
import Verification from "@/email/verification";
import WelcomeEmail from "@/email/welcome";
import ForgotPasswordEmail from "@/email/forgot-password";

type EmailType = "verification" | "welcome" | "forgot-password";

type EmailParams = {
  to: string;
  name?: string;
  code?: string;
  link?: string;
};

const getEmailSubjectAndContent = async (
  key: EmailType,
  params: EmailParams
) => {
  let subject = "";
  let renderItem = null;
  const { name, code, link } = params;

  switch (key) {
    case "verification":
      subject = "Email Verification";
      renderItem = <Verification verificationCode={code} name={name} />;
      break;
    case "welcome":
      subject = "Welcome to Budget Buddy";
      renderItem = <WelcomeEmail name={name} />;
      break;
    case "forgot-password":
      subject = "Reset Your Budget Buddy Password";
      renderItem = <ForgotPasswordEmail name={name} resetLink={link} />;
      break;
  }
  if (!renderItem) return { subject, html: "" };

  const html = await render(renderItem, {
    pretty: true,
  });

  return {
    subject,
    html,
  };
};

const email = {
  send: async (key: EmailType, params: EmailParams) => {
    const { subject, html } = await getEmailSubjectAndContent(key, params);
    const { to } = params;
    const info = await sendEmail(to, subject, html);
    console.log("Email >>", info);
    return info;
  },
};
export default email;
