"use client";
import React from "react";
import Hero from "@/components/website/hero";
import Header from "@/components/website/header";
import Features from "@/components/website/features";
import Testimonials from "@/components/website/testimonials";
import Faq from "@/components/website/faq";
import CallToAction from "@/components/website/call-to-action";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Faq />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
