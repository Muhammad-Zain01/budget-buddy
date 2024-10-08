"use client";

import LoadingScreen from "@/components/loading-screen";
import VerificationScreen from "@/components/verification-screen";
import useCurrentUser from "@/hooks/api/useCurrentUser";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import("@/layout/dashboard-layout"), {
  ssr: false,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading } = useCurrentUser();
  const isVerified = data?.data?.isVerfied;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isVerified) {
    return <VerificationScreen />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
