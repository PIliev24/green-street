"use client";

import useSWR from "swr";
import { transactionsService } from "@/services";
import { TransactionWithContractors } from "@/types/domain";
import { SWR_KEYS } from "@/utils/constants";

const transactionsFetcher = async () => {
  return await transactionsService.getTransactions();
};

const transactionFetcher = async (id: string) => {
  return await transactionsService.getTransactionById(id);
};

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<TransactionWithContractors[]>(
    SWR_KEYS.TRANSACTIONS,
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
  const { data, error, isLoading, mutate } = useSWR<TransactionWithContractors>(
    id ? SWR_KEYS.TRANSACTION_BY_ID(id) : null,
    () => transactionFetcher(id)
  );

  return {
    transaction: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate,
  };
}

export function useTransactionActions() {
  return {
    createTransaction: transactionsService.createTransaction.bind(transactionsService),
    updateTransactionState: transactionsService.updateTransactionState.bind(transactionsService),
  };
}
