import { GetQueryableQuery } from "./base/base-query";

export interface VoucherUsageHistoryGetAllQuery extends GetQueryableQuery {
  voucherId?: string | null | undefined;
  userId?: string | null | undefined;
  orderId?: string | null | undefined;
  discountAmount?: number | null | undefined;
  usedDate?: string | null | undefined;
}
