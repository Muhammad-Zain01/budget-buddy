import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const Faq = () => {
  const faqs = [
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
  ];
  return (
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
            {faqs.map((faq, index) => (
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
  );
};

export default Faq;
