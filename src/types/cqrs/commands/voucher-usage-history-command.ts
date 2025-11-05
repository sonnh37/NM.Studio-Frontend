import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface VoucherUsageHistoryCreateCommand extends CreateCommand {
  voucherId?: string | null | undefined;
  userId?: string | null | undefined;
  orderId?: string | null | undefined;
  discountAmount: number;
  usedDate: string;
}

export interface VoucherUsageHistoryUpdateCommand extends UpdateCommand {
  voucherId?: string | null | undefined;
  userId?: string | null | undefined;
  orderId?: string | null | undefined;
  discountAmount: number;
  usedDate: string;
}
