"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function AppHeader({ title, showBackButton = false, backHref = "/", backLabel = "Dashboard" }: AppHeaderProps) {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            {showBackButton && (
              <Link href={backHref} className="flex-shrink-0">
                <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{backLabel}</span>
                </Button>
              </Link>
            )}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{title}</h1>
          </div>
          <div className="flex items-center flex-shrink-0">
            <Button variant="outline" onClick={handleSignOut} size="sm" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Sign Out</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
