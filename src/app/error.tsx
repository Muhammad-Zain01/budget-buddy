"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-destructive mb-4">
        <AlertCircle size={48} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p className="text-muted-foreground mb-6">
        We&apos;re sorry for the inconvenience. Please try again.
      </p>
      <Button onClick={() => reset()} variant="default">
        Try again
      </Button>
    </div>
  );
}
