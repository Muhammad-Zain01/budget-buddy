import GeneralLayout from "@/layout/general-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
