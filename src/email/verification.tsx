import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
  Link,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const VerificationEmail = ({ name = "User", verificationCode = "000000" }) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="mt-8 text-center">
                {/* eslint-disable-next-line */}
                <img
                  src="https://budget-buddy-v1.vercel.app/logo.png"
                  alt="Budget Buddy"
                  className="w-20 mx-auto mb-4"
                />
              </div>
              <Section className="p-8">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Hello {name},
                </Text>
                <Text className="text-gray-600 mb-6">
                  Thank you for signing up! To ensure the security of your
                  account and verify your email address, please use the
                  verification code below:
                </Text>
                <div className="bg-gray-100 border-2 border-blue-300 rounded-lg p-6 mb-6">
                  <Text className="text-5xl font-bold text-center text-blue-600">
                    {verificationCode}
                  </Text>
                </div>
                <Text className="text-gray-600 mb-6">
                  If you didn&apos;t request this verification, please ignore
                  this email.
                </Text>
                <Text className="text-gray-600 mb-6">
                  If you have any questions, please don&apos;t hesitate to
                  contact our support team.
                </Text>
                <Hr className="border-gray-200 my-6" />
                <Container className="text-center">
                  <Text className="text-sm text-gray-600 mb-4 inline-block">
                    Developed by{" "}
                    <Link
                      href="https://www.muhammad-zain.com"
                      target="_blank"
                      className="font-bold text-gray-600 underline"
                    >
                      Muhammad Zain
                    </Link>
                  </Text>
                  <Link
                    href="https://github.com/Muhammad-Zain01"
                    target="_blank"
                    className="hover:opacity-100 ml-2 opacity-80 transition-opacity"
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      src="https://budget-buddy-v1.vercel.app/github.png"
                      width="15 "
                      height="15  "
                      alt="GitHub"
                      className="rounded-full"
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/muhammad-zain01/"
                    target="_blank"
                    className="hover:opacity-100 ml-1 opacity-70 transition-opacity"
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      src="https://budget-buddy-v1.vercel.app/linkedin.png"
                      width="15 "
                      height="15  "
                      alt="LinkedIn"
                      className="rounded-full"
                    />
                  </Link>
                </Container>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
