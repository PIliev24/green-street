import { TransactionWithContractors } from "@/types/domain";

export type SortField = "date" | "amount" | "from" | "to";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export function filterTransactionsBySearch(
  transactions: TransactionWithContractors[],
  searchQuery: string
): TransactionWithContractors[] {
  if (!searchQuery.trim()) {
    return transactions;
  }

  const query = searchQuery.toLowerCase().trim();
  return transactions.filter(
    transaction =>
      transaction.contractor_from.name.toLowerCase().includes(query) ||
      transaction.contractor_to.name.toLowerCase().includes(query)
  );
}

export function sortTransactions(
  transactions: TransactionWithContractors[],
  sortConfig: SortConfig
): TransactionWithContractors[] {
  return [...transactions].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortConfig.field) {
      case "date":
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "from":
        aValue = a.contractor_from.name.toLowerCase();
        bValue = b.contractor_from.name.toLowerCase();
        break;
      case "to":
        aValue = a.contractor_to.name.toLowerCase();
        bValue = b.contractor_to.name.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterAndSortTransactions(
  transactions: TransactionWithContractors[],
  searchQuery: string,
  sortConfig: SortConfig
): TransactionWithContractors[] {
  const filtered = filterTransactionsBySearch(transactions, searchQuery);
  return sortTransactions(filtered, sortConfig);
}
