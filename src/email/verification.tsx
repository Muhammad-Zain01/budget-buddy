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
              <Img
                src="https://budget-buddy-v1.vercel.app/github.png"
                width="20"
                height="20"
                alt="GitHub"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muhammad-zain01/"
              target="_blank"
              style={iconLink}
            >
              <Img
                src="https://budget-buddy-v1.vercel.app/linkedin.png"
                width="20"
                height="20"
                alt="LinkedIn"
              />
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
