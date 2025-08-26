import { TransactionState } from "@/types/domain";

export const TRANSACTION_STATES = {
  SEND: "SEND" as TransactionState,
  RECEIVED: "RECEIVED" as TransactionState,
  PAYED: "PAYED" as TransactionState,
} as const;

export const TRANSACTION_STATE_LABELS = {
  [TRANSACTION_STATES.SEND]: "Sent",
  [TRANSACTION_STATES.RECEIVED]: "Received",
  [TRANSACTION_STATES.PAYED]: "Paid",
} as const;

export const TRANSACTION_STATE_COLORS = {
  [TRANSACTION_STATES.SEND]: "bg-red-100 text-red-800",
  [TRANSACTION_STATES.RECEIVED]: "bg-yellow-100 text-yellow-800",
  [TRANSACTION_STATES.PAYED]: "bg-green-100 text-green-800",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  TRANSACTIONS: "/transactions",
  TRANSACTION_DETAILS: (id: string) => `/transactions/${id}`,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/api/auth/sign-in",
    SIGN_OUT: "/api/auth/sign-out",
    SESSION: "/api/auth/session",
  },
  CONTRACTORS: {
    LIST: "/api/contractors",
    SEARCH: "/api/contractors/search",
    BY_ID: (id: string) => `/api/contractors/${id}`,
  },
  TRANSACTIONS: {
    LIST: "/api/transactions",
    CREATE: "/api/transactions",
    BY_ID: (id: string) => `/api/transactions/${id}`,
    UPDATE_STATE: (id: string) => `/api/transactions/${id}/state`,
  },
} as const;

export const SWR_KEYS = {
  SESSION: "session",

  CONTRACTORS: "contractors",
  CONTRACTOR_SEARCH: (query: string) => `contractors-search-${query}`,
  CONTRACTOR_BY_ID: (id: string) => `contractor-${id}`,

  TRANSACTIONS: "transactions",
  TRANSACTION_BY_ID: (id: string) => `transaction-${id}`,
} as const;
