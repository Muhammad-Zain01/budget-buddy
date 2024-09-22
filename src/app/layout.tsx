import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import GeneralLayout from "@/layout/general-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Buddy - Your Personal Finance Assistant",
  description:
    "Budget Buddy helps you manage your finances, track expenses, and achieve your financial goals.",
  keywords: "budget, finance, expense tracking, financial planning",
  openGraph: {
    title: "Budget Buddy - Your Personal Finance Assistant",
    description:
      "Manage your finances and achieve your goals with Budget Buddy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Buddy - Your Personal Finance Assistant",
    description:
      "Manage your finances and achieve your goals with Budget Buddy",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GeneralLayout>
      {children}
      <Toaster />
      <Footer />
    </GeneralLayout>
  );
}
