"use client";

import { TransactionDetails } from "@/components/transaction-details";
import { CreateTransactionForm } from "@/components/create-transaction-form";
import { TransactionWithContractors } from "@/types/domain";

interface TransactionDetailContentProps {
  transaction: TransactionWithContractors;
  onTransactionUpdated: VoidFunction;
  onTransactionCreated: VoidFunction;
}

export function TransactionDetailContent({
  transaction,
  onTransactionUpdated,
  onTransactionCreated,
}: TransactionDetailContentProps) {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1">
            <CreateTransactionForm onSuccess={onTransactionCreated} />
          </div>

          <div className="md:col-span-1">
            <TransactionDetails transaction={transaction} onUpdate={onTransactionUpdated} />
          </div>
        </div>
      </div>
    </main>
  );
}
