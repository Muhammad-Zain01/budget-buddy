"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();
  return (
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
            onClick={() => router.push("/register")}
            className="bg-white text-[#2863EB] hover:bg-gray-100 dark:bg-gray-200 dark:text-[#1E4BB8] dark:hover:bg-gray-300 transition-colors duration-300"
          >
            Sign Up for Free
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
