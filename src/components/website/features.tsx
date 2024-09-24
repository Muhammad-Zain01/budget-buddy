import { motion } from "framer-motion";
import { PieChart, Wallet, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Features = () => {
  return (
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
                  Create custom budgets and track progress in real-time. Stay on
                  top of your financial goals.
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
                  Set and achieve your financial goals with intuitive tools and
                  personalized recommendations.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
