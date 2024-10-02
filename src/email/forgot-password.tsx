import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Hr,
  Preview,
  Link,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const ForgotPasswordEmail = ({
  name = "User",
  resetLink = "www.techdore.com",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Budget Buddy password</Preview>
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
                  We received a request to reset your password for your Budget
                  Buddy account. If you didn&apos;t make this request, you can safely
                  ignore this email.
                </Text>
                <Text className="text-gray-600 mb-6">
                  To reset your password, click the button below:
                </Text>
                <Section className="text-center my-8">
                  <Button
                    href={resetLink}
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Password
                  </Button>
                </Section>
                <Text className="text-gray-600 mb-6">
                  If the button doesn&apos;t work, you can also copy and paste the
                  following link into your browser:
                </Text>
                <Text className="text-blue-600 mb-6 break-all">
                  {resetLink}
                </Text>
                <Text className="text-gray-600 mb-6">
                  This link will expire in 2 hours for security reasons.
                </Text>
                <Text className="text-gray-600 mb-6">
                  If you have any questions, please don&apos;t hesitate to contact
                  our support team.
                </Text>
                <Hr className="border-gray-200 my-6" />
                <Container className="text-center">
                  <Text className="text-xs text-gray-600 mb-4 ">
                    Developed by{" "}
                    <Link
                      href="https://www.muhammad-zain.com"
                      target="_blank"
                      className="font-bold text-sm text-gray-600 underline"
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
                      width="15"
                      height="15"
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
                      width="15"
                      height="15"
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

export default ForgotPasswordEmail;
