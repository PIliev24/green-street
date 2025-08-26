"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionSearchInput } from "@/components/transaction-search-input";
import { SearchResultsInfo } from "@/components/search-results-info";
import { SortableTableHeader } from "@/components/sortable-table-header";
import { TransactionRow } from "@/components/transaction-row";
import { TransactionWithContractors } from "@/types/domain";
import { useTransactionFiltering } from "@/hooks/useTransactionFiltering";

interface TransactionsTableProps {
  transactions: TransactionWithContractors[];
  isLoading?: boolean;
}

export function TransactionsTable({ transactions, isLoading }: TransactionsTableProps) {
  const { searchQuery, setSearchQuery, sortConfig, handleSort, clearSearch, filteredTransactions } =
    useTransactionFiltering(transactions);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading transactions...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">No transactions found</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TransactionSearchInput value={searchQuery} onChange={setSearchQuery} />

        <SearchResultsInfo
          searchQuery={searchQuery}
          filteredCount={filteredTransactions.length}
          totalCount={transactions.length}
          onClearSearch={clearSearch}
        />

        {filteredTransactions.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">
              {searchQuery ? "No transactions found matching your search" : "No transactions found"}
            </div>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHeader
                      field="date"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[120px]"
                    >
                      Date
                    </SortableTableHeader>
                    <SortableTableHeader
                      field="from"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[150px]"
                    >
                      From
                    </SortableTableHeader>
                    <SortableTableHeader
                      field="to"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[150px]"
                    >
                      To
                    </SortableTableHeader>
                    <SortableTableHeader
                      field="amount"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="text-right min-w-[100px]"
                    >
                      Amount
                    </SortableTableHeader>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="w-[80px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(transaction => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
