import React from "react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

const LoadingScreen: React.FC = () => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900`}
    >
      <div className={`text-center  dark:text-white text-gray-700 `}>
        <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" />
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="mt-2 text-xs md:text-sm opacity-75">
          Please wait while we prepare your experience
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
