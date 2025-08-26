"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionStateBadge } from "@/components/transaction-state-badge";
import { TransactionWithContractors, TransactionState } from "@/types/domain";
import { updateTransactionState } from "@/actions/transactions";
import { formatCurrency } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";
import { TRANSACTION_STATES, TRANSACTION_STATE_LABELS } from "@/utils/constants";

interface TransactionDetailsProps {
  transaction: TransactionWithContractors;
  onUpdate: VoidFunction;
}

export function TransactionDetails({ transaction, onUpdate }: TransactionDetailsProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedState, setSelectedState] = useState<TransactionState>(transaction.state);

  const handleStateUpdate = (newState: TransactionState) => {
    if (newState === transaction.state) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", transaction.id);
      formData.append("state", newState);

      const result = await updateTransactionState(formData);

      if (result?.errors) {
        toast.error("Failed to update transaction state");
        setSelectedState(transaction.state);
      } else {
        toast.success("Transaction state updated successfully");
        onUpdate();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Transaction ID:</span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{transaction.id}</code>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Date:</span>
            <span className="text-sm">{formatDateTime(transaction.date)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">From:</span>
            <div className="flex items-center gap-2">
              <Image
                src={transaction.contractor_from.image}
                alt={transaction.contractor_from.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-sm">{transaction.contractor_from.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">To:</span>
            <div className="flex items-center gap-2">
              <Image
                src={transaction.contractor_to.image}
                alt={transaction.contractor_to.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-sm">{transaction.contractor_to.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Amount:</span>
            <span className="text-lg font-bold">{formatCurrency(transaction.amount)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Status:</span>
            <TransactionStateBadge state={transaction.state} />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Update Status</h3>
            <div className="flex items-center gap-4">
              <Select
                value={selectedState}
                onValueChange={value => setSelectedState(value as TransactionState)}
                disabled={isPending}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TRANSACTION_STATES).map(state => (
                    <SelectItem key={state} value={state}>
                      {TRANSACTION_STATE_LABELS[state]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => handleStateUpdate(selectedState)}
                disabled={isPending || selectedState === transaction.state}
                size="sm"
              >
                {isPending ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
