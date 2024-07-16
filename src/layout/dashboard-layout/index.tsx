import { ToastProvider } from "@/components/ui/toast";
import GeneralLayout from "../general-layout";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "next-themes";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <GeneralLayout>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </GeneralLayout>
  );
};
export default DashboardLayout;
