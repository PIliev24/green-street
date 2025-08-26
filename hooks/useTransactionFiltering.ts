import { useState, useMemo } from "react";
import { TransactionWithContractors } from "@/types/domain";
import { filterAndSortTransactions, SortField, SortConfig } from "@/utils/transaction-filtering";

export function useTransactionFiltering(transactions: TransactionWithContractors[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "date",
    direction: "desc",
  });

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredTransactions = useMemo(() => {
    return filterAndSortTransactions(transactions, searchQuery, sortConfig);
  }, [transactions, searchQuery, sortConfig]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    clearSearch,
    filteredTransactions,
  };
}
