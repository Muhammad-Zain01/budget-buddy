import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Font,
} from "@react-email/components";
import * as React from "react";

interface BudgetBuddyVerificationEmailProps {
  verificationCode?: string;
}

export const BudgetBuddyVerificationEmail = ({
  verificationCode,
}: BudgetBuddyVerificationEmailProps) => (
  <Html>
    <Head>
      <Font
        fontFamily="Poppins"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* eslint-disable-next-line */}
        <img
          src={`https://budget-buddy-v1.vercel.app/logo.png`}
          width="64"
          height="64"
          alt="Budget Buddy's Logo"
          style={logo}
        />

        <Heading style={h1}>Email Verification</Heading>
        <Text style={text}>
          Thank you for signing up for Budget Buddy! Please verify your email
          address by using the code below:
        </Text>
        <Container style={codeContainer}>
          <Text style={bigCode}>{verificationCode}</Text>
        </Container>
        <Text style={disclaimer}>
          If you did not sign up for Budget Buddy, please ignore this email.
        </Text>

        <Container style={footerContainer}>
          <Text style={footer}>
            Developed by{" "}
            <Link
              href="https://www.muhammad-zain.com"
              target="_blank"
              style={link}
            >
              Muhammad Zain
            </Link>
          </Text>
          <Container style={socialLinks}>
            <Link
              href="https://github.com/Muhammad-Zain01"
              target="_blank"
              style={iconLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.5c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.61V22"></path>
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/in/muhammad-zain01/"
              target="_blank"
              style={iconLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </Container>
        </Container>
      </Container>
    </Body>
  </Html>
);

BudgetBuddyVerificationEmail.PreviewProps = {
  verificationCode: "123456",
} as BudgetBuddyVerificationEmailProps;

export default BudgetBuddyVerificationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Poppins, Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  width: "100%",
  maxWidth: "560px",
};

const logo = {
  margin: "0 auto 32px",
  display: "block",
};

const h1 = {
  color: "#333",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 24px",
  padding: "0",
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
};

const bigCode = {
  color: "#000",
  fontSize: "56px",
  fontWeight: "900",
  letterSpacing: "5px",
  lineHeight: "1",
  textAlign: "center" as const,
};

const codeContainer = {
  margin: "20px 0",
  padding: "5px",
};

const disclaimer = {
  color: "#777",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerContainer = {
  borderTop: "1px solid #eee",
  marginTop: "32px",
  paddingTop: "32px",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const link = {
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
};

const socialLinks = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "16px",
};

const iconLink = {
  display: "inline-block",
  margin: "0 8px",
};
