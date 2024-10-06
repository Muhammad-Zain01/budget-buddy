// import request from "./request";
import Plunk from "@plunk/node";

// const sendEmail = async (to: string, subject: string, content: string) => {
//   const URL = process.env.EMAIL_URL;
//   const ACCOUNT = process.env.EMAIL_ACCOUNT;

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     to: to,
//     subject: subject,
//     htmlBody: Buffer.from(content).toString("base64"),
//     selectedAccount: ACCOUNT,
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   // @ts-ignore
//   const response = await request(URL, requestOptions);
//   return await response.json();
// };

const sendEmail = (to: string, subject: string, content: string) => {
  const plunk = new Plunk(process.env.EMAIL_API_KEY || "");

  return plunk.emails.send({
    to: to,
    subject: subject,
    body: content,
  });
};

export default sendEmail;
