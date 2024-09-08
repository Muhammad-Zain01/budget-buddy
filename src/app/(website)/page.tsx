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
import { PieChart, Wallet, TrendingUp, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <img src="/logo.png" className="w-10" />
            <span className="italic text-2xl text-[#2863EB]" >Budget Buddy</span>
          </div>

          <div>
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Smart Budgeting Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your finances with BudgetPro. Track, plan, and
            achieve your financial goals effortlessly.
          </p>
          <Button size="lg">Signup Now</Button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/api/placeholder/800/600"
            alt="Dashboard Preview"
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
                  Expense Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Categorize and monitor your expenses with ease.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                  Budget Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create custom budgets and track progress in real-time.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                  Financial Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Set and achieve your financial goals with intuitive tools.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white">
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    "BudgetPro has completely transformed how I manage my
                    finances. It's intuitive, powerful, and has helped me save
                    more than ever before."
                  </p>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">Financial Analyst</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {[
              "How secure is my financial data?",
              "Can I connect my bank accounts?",
              "Is there a mobile app available?",
              "What if I need help using the platform?",
            ].map((question, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Financial Journey Today
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who have transformed their financial lives
            with BudgetPro.
          </p>
          <Button size="lg" variant="secondary">
            Sign Up for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 BudgetPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
