"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase";
import {
  Transaction,
  CreateTransactionSchema,
  UpdateTransactionStateSchema,
  TransactionWithContractors,
} from "@/types/domain";
import { ROUTES } from "@/utils/constants";
import { z } from "zod";

export async function getTransactions(): Promise<{
  data: TransactionWithContractors[] | null;
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
    data: data as TransactionWithContractors[],
    error: null,
  };
}

export async function getTransactionById(id: string): Promise<{
  data: TransactionWithContractors | null;
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
    data: data as TransactionWithContractors,
    error: null,
  };
}

export async function createTransaction(formData: FormData) {
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
      errors: fieldErrors.fieldErrors,
    };
  }

  const { account_from, account_to, amount } = validatedFields.data;

  // Prevent self-transactions
  if (account_from === account_to) {
    return {
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
      errors: {
        general: [error.message],
      },
    };
  }

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.TRANSACTIONS);

  return {
    data: data as Transaction,
    errors: null,
  };
}

export async function updateTransactionState(formData: FormData) {
  const rawFormData = {
    id: formData.get("id") as string,
    state: formData.get("state") as string,
  };

  const validatedFields = UpdateTransactionStateSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
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
      errors: {
        general: [error.message],
      },
    };
  }

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.TRANSACTIONS);
  revalidatePath(ROUTES.TRANSACTION_DETAILS(validatedFields.data.id));

  return {
    data: data as Transaction,
    errors: null,
  };
}
