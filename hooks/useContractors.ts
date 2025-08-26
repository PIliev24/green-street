"use client";

import useSWR from "swr";
import { contractorsService } from "@/services";
import { Contractor } from "@/types/domain";
import { SWR_KEYS } from "@/utils/constants";

const contractorsFetcher = async () => {
  return await contractorsService.getContractors();
};

const searchContractorsFetcher = async (query: string) => {
  return await contractorsService.searchContractors(query);
};

export function useContractors() {
  const { data, error, isLoading, mutate } = useSWR<Contractor[]>(SWR_KEYS.CONTRACTORS, contractorsFetcher);

  return {
    contractors: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate,
  };
}

export function useSearchContractors(query: string) {
  const shouldFetch = query.length > 0;

  const { data, error, isLoading, mutate } = useSWR<Contractor[]>(
    shouldFetch ? SWR_KEYS.CONTRACTOR_SEARCH(query) : null,
    () => searchContractorsFetcher(query)
  );

  return {
    contractors: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate,
  };
}
