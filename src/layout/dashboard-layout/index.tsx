import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Providers from "./components/providers";
import { AlertModal } from "@/components/alert-modal";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      <AlertModal />
    </>
  );
};
export default DashboardLayout;
