"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Wallet, TrendingUp, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import User from "@/layout/dashboard-layout/components/user";
import ThemeShifter from "@/layout/dashboard-layout/components/theme-shifter";
import DashbaordPreview from "@/components/dashboard-preview";
import { motion } from "framer-motion";

const LandingPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status == "authenticated";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Budget Buddy Logo"
              width={40}
              height={40}
            />
            <span className="italic text-2xl text-[#2863EB] dark:text-[#4D8EFF] font-serif">
              Budget Buddy
            </span>
          </div>
          <div className="flex gap-3">
            <ThemeShifter />
            {isAuthenticated ? (
              <User />
            ) : (
              <div>
                <Button
                  variant="ghost"
                  className="mr-2 hover:text-[#2863EB] dark:hover:text-[#4D8EFF]"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button className="bg-[#2863EB] hover:bg-[#1E4BB8] dark:bg-[#4D8EFF] dark:hover:bg-[#3A6CD9] transition-colors duration-300">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="relative flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl mb-4 leading-tight"
            >
              Smart Budgeting{" "}
              <span className="text-[#2863EB] dark:text-[#4D8EFF]">
                Made Simple
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
            >
              Take control of your finances with Budget Buddy. Track, plan, and
              achieve your financial goals effortlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-[#2863EB] hover:bg-[#1E4BB8] dark:bg-[#4D8EFF] dark:hover:bg-[#3A6CD9] transition-colors duration-300"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto"
          >
            <DashbaordPreview />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 dark:text-gray-100"
          >
            Key Features
          </motion.h2>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mb-4">
                    <PieChart className="w-16 h-16 mx-auto text-[#2863EB] dark:text-[#4D8EFF]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#2863EB] dark:text-[#4D8EFF]">
                    Expense Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="dark:text-gray-300 text-center">
                    Categorize and monitor your expenses with ease. Get insights
                    into your spending habits.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mb-4">
                    <Wallet className="w-16 h-16 mx-auto text-[#2863EB] dark:text-[#4D8EFF]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#2863EB] dark:text-[#4D8EFF]">
                    Budget Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="dark:text-gray-300 text-center">
                    Create custom budgets and track progress in real-time. Stay
                    on top of your financial goals.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mb-4">
                    <TrendingUp className="w-16 h-16 mx-auto text-[#2863EB] dark:text-[#4D8EFF]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#2863EB] dark:text-[#4D8EFF]">
                    Financial Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="dark:text-gray-300 text-center">
                    Set and achieve your financial goals with intuitive tools
                    and personalized recommendations.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 dark:text-gray-100"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                quote:
                  "Budget Buddy has completely transformed how I manage my finances. It&apos;s intuitive, powerful, and has helped me save more than ever before.",
                name: "John Doe",
                title: "Financial Analyst",
              },
              {
                quote:
                  "I&apos;ve tried many budgeting apps, but Budget Buddy stands out with its user-friendly interface and comprehensive features.",
                name: "Jane Smith",
                title: "Small Business Owner",
              },
              {
                quote:
                  "Thanks to Budget Buddy, I&apos;ve finally gotten control of my spending and am on track to meet my savings goals.",
                name: "Mike Johnson",
                title: "Software Engineer",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col justify-between h-full">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold dark:text-gray-200">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 dark:text-gray-100"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How secure is my financial data?",
                  answer:
                    "We take security seriously. Your data is encrypted and stored securely. We use bank-level security measures to protect your information.",
                },
                {
                  question: "Can I connect my bank accounts?",
                  answer:
                    "Yes, you can securely connect your bank accounts for automatic transaction importing and real-time balance updates.",
                },
                {
                  question: "Is there a mobile app available?",
                  answer:
                    "Absolutely! We offer mobile apps for both iOS and Android devices, allowing you to manage your finances on the go.",
                },
                {
                  question: "What if I need help using the platform?",
                  answer:
                    "We provide comprehensive documentation, video tutorials, and responsive customer support to assist you with any questions or issues.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left dark:text-gray-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#2863EB] dark:bg-[#1E4BB8] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Start Your Financial Journey Today
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl mb-8"
          >
            Join thousands of users who have transformed their financial lives
            with Budget Buddy.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#2863EB] hover:bg-gray-100 dark:bg-gray-200 dark:text-[#1E4BB8] dark:hover:bg-gray-300 transition-colors duration-300"
            >
              Sign Up for Free
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
