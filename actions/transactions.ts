"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase";
import { CreateTransactionSchema, UpdateTransactionStateSchema } from "@/types/domain";
import { TransactionRow, TransactionWithContractorDetails } from "@/types/database";
import { ROUTES } from "@/utils/constants";

export async function getTransactions(): Promise<{
  data: TransactionWithContractorDetails[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      contractor_from:contractors!transactions_account_from_fkey(*),
      contractor_to:contractors!transactions_account_to_fkey(*)
    `
    )
    .order("date", { ascending: false });

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as TransactionWithContractorDetails[],
    error: null,
  };
}

export async function getTransactionById(id: string): Promise<{
  data: TransactionWithContractorDetails | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      contractor_from:contractors!transactions_account_from_fkey(*),
      contractor_to:contractors!transactions_account_to_fkey(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  return {
    data: data as TransactionWithContractorDetails,
    error: null,
  };
}

export async function createTransaction(formData: FormData): Promise<{
  data: TransactionRow | null;
  error: string | null;
  errors?: Record<string, string[]>;
}> {
  const rawFormData = {
    account_from: formData.get("account_from") as string,
    account_to: formData.get("account_to") as string,
    amount: parseFloat(formData.get("amount") as string) * 100, // Convert to cents
  };

  // Validate form data
  const validatedFields = CreateTransactionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten();
    return {
      data: null,
      error: "Validation failed",
      errors: fieldErrors.fieldErrors,
    };
  }

  const { account_from, account_to, amount } = validatedFields.data;

  // Prevent self-transactions
  if (account_from === account_to) {
    return {
      data: null,
      error: "Invalid transaction",
      errors: {
        account_to: ["Cannot send money to the same person"],
      },
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      account_from,
      account_to,
      amount,
      state: "SEND",
    })
    .select()
    .single();

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.TRANSACTIONS);

  return {
    data: data as TransactionRow,
    error: null,
  };
}

export async function updateTransactionState(formData: FormData): Promise<{
  data: TransactionRow | null;
  error: string | null;
  errors?: Record<string, string[]>;
}> {
  const rawFormData = {
    id: formData.get("id") as string,
    state: formData.get("state") as string,
  };

  const validatedFields = UpdateTransactionStateSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten();
    return {
      data: null,
      error: "Validation failed",
      errors: fieldErrors.fieldErrors,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .update({
      state: validatedFields.data.state,
    })
    .eq("id", validatedFields.data.id)
    .select()
    .single();

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.TRANSACTIONS);
  revalidatePath(ROUTES.TRANSACTION_DETAILS(validatedFields.data.id));

  return {
    data: data as TransactionRow,
    error: null,
  };
}
