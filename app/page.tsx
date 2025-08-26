import { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Dashboard - Green Street",
  description: "Manage your transactions and view analytics",
};

export default function Home() {
  return <HomePage />;
}
