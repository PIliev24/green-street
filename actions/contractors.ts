"use server";

import { createClient } from "@/lib/supabase";
import { ContractorRow } from "@/types/database";

export async function getContractors(): Promise<{
  data: ContractorRow[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contractors").select("*").order("name", { ascending: true });

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as ContractorRow[],
    error: null,
  };
}

export async function searchContractors(query: string): Promise<{
  data: ContractorRow[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contractors")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("name", { ascending: true })
    .limit(20);

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as ContractorRow[],
    error: null,
  };
}

export async function getContractorById(id: string): Promise<{
  data: ContractorRow | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contractors").select("*").eq("id", id).single();

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as ContractorRow,
    error: null,
  };
}
