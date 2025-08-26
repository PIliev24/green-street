import { TransactionView } from "@/components/transaction-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Details - Green Street",
  description: "View and manage transaction details",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <TransactionView transactionId={id} />;
}
