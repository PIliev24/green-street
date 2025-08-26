"use client";

import useSWR from "swr";
import { getContractors, searchContractors } from "@/actions/contractors";
import { Contractor } from "@/types/domain";

const contractorsFetcher = async () => {
  const result = await getContractors();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};

const searchContractorsFetcher = async (query: string) => {
  const result = await searchContractors(query);
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};

export function useContractors() {
  const { data, error, isLoading, mutate } = useSWR<Contractor[] | null>("contractors", contractorsFetcher);

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

  const { data, error, isLoading, mutate } = useSWR<Contractor[] | null>(
    shouldFetch ? ["search-contractors", query] : null,
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
