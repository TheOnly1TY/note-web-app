"use client";

import { useRouter } from "next/navigation";
// import Button from "./_ui/Button";

interface GlobalErrorProps {
  error?: Error;
  reset?: () => void;
}

// THIS GLOBAL ERROR PAGE COMPONENT WOULD BE REDESINED LATER (BUT FOR NOW, LET'S USE THIS)

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (reset) {
      reset();
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-2xl font-bold text-red-600">
        500 - Something went wrong
      </h1>
      <p className="text-dark-gray">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      {/* <Button onClick={handleRetry}>Try Again</Button> */}
    </div>
  );
}
