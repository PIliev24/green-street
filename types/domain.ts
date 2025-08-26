import { z } from "zod";

// Enums
export const TransactionState = z.enum(["SEND", "RECEIVED", "PAYED"]);
export type TransactionState = z.infer<typeof TransactionState>;

// Domain Schemas
export const ContractorSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  image: z.url("Must be a valid URL"),
  created_at: z.string(),
});

export const CreateContractorSchema = ContractorSchema.omit({
  id: true,
  created_at: true,
});

export const TransactionSchema = z
  .object({
    id: z.uuid(),
    date: z.string(),
    account_from: z.uuid("Invalid account ID"),
    account_to: z.uuid("Invalid account ID"),
    amount: z
      .number()
      .int("Amount must be an integer")
      .positive("Amount must be positive")
      .min(1, "Amount must be at least 1 cent"),
    state: TransactionState,
    created_at: z.string(),
  })
  .refine(data => data.account_from !== data.account_to, {
    message: "Cannot send transaction to the same account",
    path: ["account_to"],
  });

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  date: true,
  state: true,
  created_at: true,
});

export const UpdateTransactionStateSchema = z.object({
  id: z.string().uuid(),
  state: TransactionState,
});

// Login Schema
export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type Contractor = z.infer<typeof ContractorSchema>;
export type CreateContractor = z.infer<typeof CreateContractorSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionState = z.infer<typeof UpdateTransactionStateSchema>;
export type Login = z.infer<typeof LoginSchema>;

// Extended types with contractor information
export type TransactionWithContractors = Transaction & {
  contractor_from: Contractor;
  contractor_to: Contractor;
};
