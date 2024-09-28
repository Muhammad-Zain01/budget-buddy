import request from "./request";

const sendEmail = async (to: string, subject: string, content: string) => {
  const URL = process.env.EMAIL_URL;
  const ACCOUNT = process.env.EMAIL_ACCOUNT;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    to: to,
    subject: Buffer.from(subject).toString("base64"),
    htmlBody: Buffer.from(content).toString("base64"),
    selectedAccount: ACCOUNT,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // @ts-ignore
  const response = await request(URL, requestOptions);
  return await response.json();
};

export default sendEmail;
