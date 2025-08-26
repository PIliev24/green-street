"use client";

import { AppHeader } from "@/components/app-header";
import { TransactionsTable } from "@/components/transactions-table";
import { CreateTransactionForm } from "@/components/create-transaction-form";
import { useTransactions } from "@/hooks/useTransactions";

export function HomePage() {
  const { transactions, isLoading, mutate } = useTransactions();

  const handleTransactionCreated = () => {
    mutate();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Green Street Dashboard" />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Create Transaction Form - Full width on mobile, constrained on larger screens */}
            <div className="w-full lg:max-w-2xl">
              <CreateTransactionForm onSuccess={handleTransactionCreated} />
            </div>

            {/* Transactions Table - Full width with proper overflow handling */}
            <div className="w-full">
              <TransactionsTable transactions={transactions} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
