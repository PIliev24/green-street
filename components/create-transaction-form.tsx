"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractorSelect } from "@/components/contractor-select";
import { useTransactionActions } from "@/hooks/useTransactions";
import { getFieldError } from "@/utils/form";

interface CreateTransactionFormProps {
  onSuccess?: () => void;
}

export function CreateTransactionForm({ onSuccess }: CreateTransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const { createTransaction } = useTransactionActions();

  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleAccountFromChange = (value: string) => {
    setAccountFrom(value);
    if (accountTo === value) {
      setAccountTo("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setErrors({});

      if (accountFrom === accountTo) {
        setErrors({
          account_to: ["Cannot send money to the same person"],
        });
        toast.error("Cannot send money to yourself");
        return;
      }

      try {
        await createTransaction({
          account_from: accountFrom,
          account_to: accountTo,
          amount: amount,
        });

        setAccountFrom("");
        setAccountTo("");
        setAmount("");
        setErrors({});

        toast.success("Transaction created successfully");
        onSuccess?.();
      } catch (error: unknown) {
        if (error && typeof error === "object" && "errors" in error) {
          setErrors((error as { errors: Record<string, string[]> }).errors);
        }
        const message =
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "Failed to create transaction";
        toast.error(message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account_from">From Account</Label>
            <ContractorSelect
              value={accountFrom}
              onValueChange={handleAccountFromChange}
              placeholder="Select sender..."
              disabled={isPending}
            />
            <input type="hidden" name="account_from" value={accountFrom} />
            {getFieldError(errors, "account_from") && (
              <p className="text-sm text-red-600">{getFieldError(errors, "account_from")}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="account_to">To Account</Label>
            <ContractorSelect
              value={accountTo}
              onValueChange={setAccountTo}
              placeholder={accountFrom ? "Select recipient..." : "Select sender first..."}
              disabled={isPending || !accountFrom}
            />
            <input type="hidden" name="account_to" value={accountTo} />
            {accountFrom && <p className="text-xs text-gray-600">Note: You cannot send money to the same person</p>}
            {getFieldError(errors, "account_to") && (
              <p className="text-sm text-red-600">{getFieldError(errors, "account_to")}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={isPending}
              required
            />
            {getFieldError(errors, "amount") && (
              <p className="text-sm text-red-600">{getFieldError(errors, "amount")}</p>
            )}
          </div>

          {getFieldError(errors, "general") && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">{getFieldError(errors, "general")}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !accountFrom || !accountTo || !amount || accountFrom === accountTo}
          >
            {isPending ? "Creating..." : "Create Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
