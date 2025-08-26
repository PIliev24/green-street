export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type TransactionState = "SEND" | "RECEIVED" | "PAYED";

export type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export type ContractorRow = {
  id: string;
  name: string;
  image: string;
  created_at: string;
};

export type ContractorInsert = {
  id?: string;
  name: string;
  image: string;
  created_at?: string;
};

export type ContractorUpdate = {
  id?: string;
  name?: string;
  image?: string;
  created_at?: string;
};

export type ContractorTable = {
  Row: ContractorRow;
  Insert: ContractorInsert;
  Update: ContractorUpdate;
  Relationships: [];
};

export type TransactionRow = {
  id: string;
  date: string;
  account_from: string;
  account_to: string;
  amount: number;
  state: TransactionState;
  created_at: string;
};

export type TransactionInsert = {
  id?: string;
  date?: string;
  account_from: string;
  account_to: string;
  amount: number;
  state?: TransactionState;
  created_at?: string;
};

export type TransactionUpdate = {
  id?: string;
  date?: string;
  account_from?: string;
  account_to?: string;
  amount?: number;
  state?: TransactionState;
  created_at?: string;
};

export type TransactionRelationships = [
  {
    foreignKeyName: "transactions_account_from_fkey";
    columns: ["account_from"];
    isOneToOne: false;
    referencedRelation: "contractors";
    referencedColumns: ["id"];
  },
  {
    foreignKeyName: "transactions_account_to_fkey";
    columns: ["account_to"];
    isOneToOne: false;
    referencedRelation: "contractors";
    referencedColumns: ["id"];
  }
];

export type TransactionTable = {
  Row: TransactionRow;
  Insert: TransactionInsert;
  Update: TransactionUpdate;
  Relationships: TransactionRelationships;
};

export type DatabaseTables = {
  contractors: ContractorTable;
  transactions: TransactionTable;
};

export type DatabaseViews = {
  [_ in never]: never;
};

export type DatabaseFunctions = {
  [_ in never]: never;
};

export type DatabaseEnums = {
  transaction_state: TransactionState;
};

export type DatabaseCompositeTypes = {
  [_ in never]: never;
};

// Extended types for joined queries
export type TransactionWithContractorDetails = TransactionRow & {
  contractor_from: ContractorRow;
  contractor_to: ContractorRow;
};

export type Database = {
  public: {
    Tables: DatabaseTables;
    Views: DatabaseViews;
    Functions: DatabaseFunctions;
    Enums: DatabaseEnums;
    CompositeTypes: DatabaseCompositeTypes;
  };
};
