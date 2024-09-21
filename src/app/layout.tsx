import { Toaster } from "@/components/ui/toaster";
import GeneralLayout from "@/layout/general-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GeneralLayout>
      {children}
      <Toaster />
    </GeneralLayout>
  );
}
