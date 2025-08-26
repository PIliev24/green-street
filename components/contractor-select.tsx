"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearchContractors, useContractors } from "@/hooks/useContractors";
import { debounce } from "@/utils/form";

interface ContractorSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ContractorSelect({
  value,
  onValueChange,
  placeholder = "Select contractor...",
  disabled = false,
}: ContractorSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { contractors: allContractors } = useContractors();
  const { contractors: searchResults } = useSearchContractors(searchQuery);

  const debouncedSetSearchQuery = debounce(setSearchQuery, 300);

  const displayContractors = searchQuery.trim() ? searchResults : allContractors;

  const selectedContractor = allContractors.find(contractor => contractor.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedContractor ? (
            <div className="flex items-center gap-2">
              <Image
                src={selectedContractor.image}
                alt={selectedContractor.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              {selectedContractor.name}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search contractors..." onValueChange={debouncedSetSearchQuery} />
          <CommandEmpty>No contractors found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {displayContractors.map(contractor => (
              <CommandItem
                key={contractor.id}
                value={contractor.name}
                onSelect={() => {
                  onValueChange(contractor.id);
                  setOpen(false);
                  setSearchQuery("");
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === contractor.id ? "opacity-100" : "opacity-0")} />
                <div className="flex items-center gap-2">
                  <Image
                    src={contractor.image}
                    alt={contractor.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                  />
                  {contractor.name}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
