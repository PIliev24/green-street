import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TransactionSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TransactionSearchInput({
  value,
  onChange,
  placeholder = "Search by contractor name...",
  className = "",
}: TransactionSearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="pl-10" />
    </div>
  );
}
