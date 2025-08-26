"use client";

import useSWR from "swr";
import { getTransactions, getTransactionById } from "@/actions/transactions";
import { TransactionWithContractors } from "@/types/domain";

const transactionsFetcher = async () => {
  const result = await getTransactions();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};

const transactionByIdFetcher = async (id: string) => {
  const result = await getTransactionById(id);
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<TransactionWithContractors[] | null>(
    "transactions",
    transactionsFetcher
  );

  return {
    transactions: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate,
  };
}

export function useTransaction(id: string) {
  const { data, error, isLoading, mutate } = useSWR<TransactionWithContractors | null>(
    id ? ["transaction", id] : null,
    () => transactionByIdFetcher(id)
  );

  return {
    transaction: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate,
  };
}
