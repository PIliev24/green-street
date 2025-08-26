"use client";

import { AppHeader } from "@/components/app-header";
import { LoadingState } from "@/components/loading-state";
import { NotFoundState } from "@/components/not-found-state";
import { TransactionDetailContent } from "@/components/transaction-detail-content";
import { useTransaction } from "@/hooks/useTransactions";

interface TransactionViewProps {
  transactionId: string;
}

export function TransactionView({ transactionId }: TransactionViewProps) {
  const { transaction, isLoading, mutate } = useTransaction(transactionId);

  const handleTransactionUpdated = () => {
    mutate();
  };

  const handleTransactionCreated = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader title="Transaction Details" showBackButton backLabel="Dashboard" />
        <LoadingState message="Loading transaction..." />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader title="Transaction Details" showBackButton backLabel="Dashboard" />
        <NotFoundState
          title="Transaction not found"
          message="The requested transaction could not be found"
          backLabel="Back to Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Transaction Details" showBackButton backLabel="Dashboard" />
      <TransactionDetailContent
        transaction={transaction}
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionCreated={handleTransactionCreated}
      />
    </div>
  );
}
