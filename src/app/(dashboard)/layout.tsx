"use client";

import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import("@/layout/dashboard-layout"), {
  ssr: false,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
