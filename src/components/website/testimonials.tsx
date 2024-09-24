import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

const Testimonials = () => {
  const reviews = [
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
  ];

  return (
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
          {reviews.map((testimonial, i) => (
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
  );
};

export default Testimonials;
