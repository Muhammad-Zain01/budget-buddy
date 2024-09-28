import { render } from "@react-email/components";
import sendEmail from "./email";
import Verification from "@/email/verification";
import WelcomeEmail from "@/email/welcome";

type EmailType = "verification" | "welcome";

type EmailParams = {
  to: string;
  name?: string;
  code?: string;
};

const getEmailSubjectAndContent = async (
  key: EmailType,
  params: EmailParams
) => {
  let subject = "";
  let renderItem = null;
  const { name, code } = params;

  switch (key) {
    case "verification":
      subject = "Email Verification";
      renderItem = <Verification verificationCode={code} name={name} />;
      break;
    case "welcome":
      subject = "Welcome to Budget Buddy";
      renderItem = <WelcomeEmail name={name} />;
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
