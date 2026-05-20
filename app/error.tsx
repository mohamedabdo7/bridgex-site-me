"use client";

import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-4xl font-bold text-heading mb-4">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
