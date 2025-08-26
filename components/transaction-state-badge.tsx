"use client";

import { Badge } from "@/components/ui/badge";
import { TransactionState } from "@/types/domain";
import { TRANSACTION_STATE_LABELS, TRANSACTION_STATE_COLORS } from "@/utils/constants";

interface TransactionStateBadgeProps {
  state: TransactionState;
}

export function TransactionStateBadge({ state }: TransactionStateBadgeProps) {
  return <Badge className={TRANSACTION_STATE_COLORS[state]}>{TRANSACTION_STATE_LABELS[state]}</Badge>;
}
