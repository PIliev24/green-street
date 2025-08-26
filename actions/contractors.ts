"use server";

import { createClient } from "@/lib/supabase";
import { Contractor } from "@/types/domain";

export async function getContractors(): Promise<{
  data: Contractor[] | null;
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
    data: data as Contractor[],
    error: null,
  };
}

export async function searchContractors(query: string): Promise<{
  data: Contractor[] | null;
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
    data: data as Contractor[],
    error: null,
  };
}

export async function getContractorById(id: string): Promise<{
  data: Contractor | null;
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
    data: data as Contractor,
    error: null,
  };
}
