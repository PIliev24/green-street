import { Button } from "@/components/ui/button";

interface SearchResultsInfoProps {
  searchQuery: string;
  filteredCount: number;
  totalCount: number;
  onClearSearch: () => void;
}

export function SearchResultsInfo({ searchQuery, filteredCount, totalCount, onClearSearch }: SearchResultsInfoProps) {
  if (!searchQuery) return null;

  return (
    <div className="text-sm text-gray-600">
      Found {filteredCount} of {totalCount} transactions
      {filteredCount !== totalCount && (
        <Button variant="link" size="sm" onClick={onClearSearch} className="h-auto p-0 ml-2 text-blue-600">
          Clear search
        </Button>
      )}
    </div>
  );
}
