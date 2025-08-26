import Link from "next/link";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { TransactionStateBadge } from "@/components/transaction-state-badge";
import { TransactionWithContractors } from "@/types/domain";
import { formatCurrency } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";

interface TransactionRowProps {
  transaction: TransactionWithContractors;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <TableRow key={transaction.id} className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium py-3">
        <div className="whitespace-nowrap">{formatDateTime(transaction.date)}</div>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={transaction.contractor_from.image}
            alt={transaction.contractor_from.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full flex-shrink-0"
          />
          <span className="truncate">{transaction.contractor_from.name}</span>
        </div>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={transaction.contractor_to.image}
            alt={transaction.contractor_to.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full flex-shrink-0"
          />
          <span className="truncate">{transaction.contractor_to.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium py-3">
        <div className="whitespace-nowrap">{formatCurrency(transaction.amount)}</div>
      </TableCell>
      <TableCell className="py-3">
        <TransactionStateBadge state={transaction.state} />
      </TableCell>
      <TableCell className="py-3 text-center">
        <Link
          href={`/transactions/${transaction.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors inline-block"
        >
          View
        </Link>
      </TableCell>
    </TableRow>
  );
}
