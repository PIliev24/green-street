import { TransactionRow, TransactionWithContractorDetails } from "@/types/database";
import { Transaction, TransactionWithContractors, TransactionSchema, CreateTransactionSchema } from "@/types/domain";
import { API_ENDPOINTS } from "@/utils/constants";
import { apiClient } from "./api-client";

function mapTransactionToDomain(transactionRow: TransactionRow): Transaction {
  const result = TransactionSchema.safeParse({
    id: transactionRow.id,
    date: transactionRow.date,
    account_from: transactionRow.account_from,
    account_to: transactionRow.account_to,
    amount: transactionRow.amount,
    state: transactionRow.state,
    created_at: transactionRow.created_at,
  });

  if (!result.success) {
    console.error("Failed to validate transaction:", result.error);
    throw new Error("Invalid transaction data received from API");
  }

  return result.data;
}

function mapTransactionWithContractorsToDomain(
  transactionDetails: TransactionWithContractorDetails
): TransactionWithContractors {
  return {
    id: transactionDetails.id,
    date: transactionDetails.date,
    account_from: transactionDetails.account_from,
    account_to: transactionDetails.account_to,
    amount: transactionDetails.amount,
    state: transactionDetails.state,
    created_at: transactionDetails.created_at,
    contractor_from: {
      id: transactionDetails.contractor_from.id,
      name: transactionDetails.contractor_from.name,
      image: transactionDetails.contractor_from.image,
      created_at: transactionDetails.contractor_from.created_at,
    },
    contractor_to: {
      id: transactionDetails.contractor_to.id,
      name: transactionDetails.contractor_to.name,
      image: transactionDetails.contractor_to.image,
      created_at: transactionDetails.contractor_to.created_at,
    },
  };
}

export class TransactionsService {
  async getTransactions(): Promise<TransactionWithContractors[]> {
    const transactionDetails = await apiClient.get<TransactionWithContractorDetails[]>(API_ENDPOINTS.TRANSACTIONS.LIST);

    return transactionDetails.map(mapTransactionWithContractorsToDomain);
  }

  async getTransactionById(id: string): Promise<TransactionWithContractors> {
    const transactionDetails = await apiClient.get<TransactionWithContractorDetails>(
      API_ENDPOINTS.TRANSACTIONS.BY_ID(id)
    );

    return mapTransactionWithContractorsToDomain(transactionDetails);
  }

  async createTransaction(data: { account_from: string; account_to: string; amount: string }): Promise<Transaction> {
    const validatedData = CreateTransactionSchema.parse({
      account_from: data.account_from,
      account_to: data.account_to,
      amount: parseFloat(data.amount) * 100,
    });

    const formData = new FormData();
    formData.set("account_from", validatedData.account_from);
    formData.set("account_to", validatedData.account_to);
    formData.set("amount", data.amount);

    const transactionRow = await apiClient.post<TransactionRow>(API_ENDPOINTS.TRANSACTIONS.CREATE, formData);

    return mapTransactionToDomain(transactionRow);
  }

  async updateTransactionState(id: string, state: string): Promise<Transaction> {
    const formData = new FormData();
    formData.set("state", state);

    const transactionRow = await apiClient.patch<TransactionRow>(API_ENDPOINTS.TRANSACTIONS.UPDATE_STATE(id), formData);

    return mapTransactionToDomain(transactionRow);
  }
}

export const transactionsService = new TransactionsService();
