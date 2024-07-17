import { ToastProvider } from "@/components/ui/toast";
import GeneralLayout from "../general-layout";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Providers from "./components/providers";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <GeneralLayout>
      <Providers>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      </Providers>
    </GeneralLayout>
  );
};
export default DashboardLayout;
