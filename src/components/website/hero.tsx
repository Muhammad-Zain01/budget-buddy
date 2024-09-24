"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import DashbaordPreview from "../dashboard-preview";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
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
              onClick={() => router.push("/register")}
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
  );
};

export default Hero;
