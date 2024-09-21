"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PieChart, Wallet, TrendingUp, Check, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <Image src="/logo.png" alt="Budget Buddy Logo" width={40} height={40} />
            <span className="italic text-2xl text-[#2863EB] font-serif">Budget Buddy</span>
          </div>

          <div>
            <Button
              variant="ghost"
              className="mr-2 hover:text-[#2863EB]"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button className="bg-[#2863EB] hover:bg-[#1E4BB8] transition-colors duration-300">Sign Up</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-tight">
            Smart Budgeting <span className="text-[#2863EB]">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your finances with Budget Buddy. Track, plan, and
            achieve your financial goals effortlessly.
          </p>
          <Button size="lg" className="bg-[#2863EB] hover:bg-[#1E4BB8] transition-colors duration-300">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            width={800}
            height={600}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2863EB]">
                  <PieChart className="w-5 h-5 mr-2" />
                  Expense Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Categorize and monitor your expenses with ease. Get insights into your spending habits.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2863EB]">
                  <Wallet className="w-5 h-5 mr-2" />
                  Budget Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create custom budgets and track progress in real-time. Stay on top of your financial goals.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2863EB]">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Financial Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Set and achieve your financial goals with intuitive tools and personalized recommendations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Budget Buddy has completely transformed how I manage my finances. It&apos;s intuitive, powerful, and has helped me save more than ever before.",
                name: "John Doe",
                title: "Financial Analyst"
              },
              {
                quote: "I&apos;ve tried many budgeting apps, but Budget Buddy stands out with its user-friendly interface and comprehensive features.",
                name: "Jane Smith",
                title: "Small Business Owner"
              },
              {
                quote: "Thanks to Budget Buddy, I&apos;ve finally gotten control of my spending and am on track to meet my savings goals.",
                name: "Mike Johnson",
                title: "Software Engineer"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "How secure is my financial data?",
                answer: "We take security seriously. Your data is encrypted and stored securely. We use bank-level security measures to protect your information."
              },
              {
                question: "Can I connect my bank accounts?",
                answer: "Yes, you can securely connect your bank accounts for automatic transaction importing and real-time balance updates."
              },
              {
                question: "Is there a mobile app available?",
                answer: "Absolutely! We offer mobile apps for both iOS and Android devices, allowing you to manage your finances on the go."
              },
              {
                question: "What if I need help using the platform?",
                answer: "We provide comprehensive documentation, video tutorials, and responsive customer support to assist you with any questions or issues."
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2863EB] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Financial Journey Today
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who have transformed their financial lives
            with Budget Buddy.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-[#2863EB] hover:bg-gray-100 transition-colors duration-300">
            Sign Up for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
          <p>&copy; 2024 Budget Buddy. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#2863EB] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[#2863EB] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-[#2863EB] transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
