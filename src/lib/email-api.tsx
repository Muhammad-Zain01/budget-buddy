import { render } from "@react-email/components";
import sendEmail from "./email";
import Verification from "@/email/verification";

type EmailType = "verification";

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
  let html = "";
  const { name, code } = params;

  switch (key) {
    case "verification":
      subject = "Email Verification";
      html = await render(
        <Verification verificationCode={code} name={name} />,
        {
          pretty: true,
        }
      );
      break;
  }

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
