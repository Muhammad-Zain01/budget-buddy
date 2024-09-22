import ThemeShifter from "@/layout/dashboard-layout/components/theme-shifter";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex justify-between items-center p-4 dark:bg-gray-900">
        <div className="flex shrink-0 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold"
            prefetch={false}
          >
            {/* eslint-disable-next-line */}
            <img src="/logo.png" className="w-6" />
            <span className="text-lg font-bold tracking-tight transition-all duration-300 data-[collapsed=true]:opacity-0 data-[collapsed=true]:scale-0 text-primary">
              Budget Buddy
            </span>
          </Link>
        </div>
        <ThemeShifter />
      </header>
      {children}
    </div>
  );
}
