"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  title?: string;
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export function NotFoundState({
  title = "Not Found",
  message = "The requested item could not be found",
  backHref = "/",
  backLabel = "Back to Dashboard",
}: NotFoundStateProps) {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-lg text-gray-600">{title}</div>
          {message !== title && <div className="text-sm text-gray-500">{message}</div>}
          <Link href={backHref}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
