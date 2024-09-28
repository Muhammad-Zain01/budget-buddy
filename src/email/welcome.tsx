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
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const WelcomeEmail = ({ name = "User" }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Budget Buddy!</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white rounded-lg  shadow-lg overflow-hidden">
              <div className="pt-8 text-center">
                {/* eslint-disable-next-line */}
                <img
                  src="https://budget-buddy-v1.vercel.app/logo.png"
                  alt="Budget Buddy"
                  className="w-20 mx-auto mb-4"
                />
              </div>
              <Section className="p-8">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Welcome, {name}!
                </Text>

                <Text className="text-gray-600 mb-4 mt-4 leading-relaxed">
                  Thank you for joining Budget Buddy! We are excited to have you
                  on board. To get started, explore our features and manage your
                  budget effectively. If you have any questions, feel free to
                  reach out to our support team.
                </Text>

                <Section className="text-center my-7">
                  <Button
                    href="https://budget-buddy-v1.vercel.app/dashboard"
                    className="bg-blue-600 text-sm text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Dashboard
                  </Button>
                </Section>
                <Hr className="border-gray-200 my-6" />
                <Container className="text-center ">
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
                  {/* Social Links */}
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
export default WelcomeEmail;
