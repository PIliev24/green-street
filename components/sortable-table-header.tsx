import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { SortField, SortConfig } from "@/utils/transaction-filtering";

interface SortableTableHeaderProps {
  field: SortField;
  children: React.ReactNode;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  className?: string;
}

export function SortableTableHeader({ field, children, sortConfig, onSort, className = "" }: SortableTableHeaderProps) {
  const isActive = sortConfig.field === field;
  const isAscending = isActive && sortConfig.direction === "asc";

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
    }
    return isAscending ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        className="h-auto p-0 font-medium hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 cursor-pointer group relative"
        onClick={() => onSort(field)}
        title={`Sort by ${children} ${isActive ? (isAscending ? "(ascending)" : "(descending)") : ""}`}
      >
        <div className="flex items-center gap-1">
          <span className={`transition-colors ${isActive ? "text-blue-600" : ""}`}>{children}</span>
          <span
            className={`transition-all duration-200 ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}
          >
            {getSortIcon()}
          </span>
        </div>
        {/* Subtle underline on hover for better affordance */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
      </Button>
    </TableHead>
  );
}
