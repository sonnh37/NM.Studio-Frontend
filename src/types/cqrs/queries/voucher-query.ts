import { VoucherStatus, VoucherType } from "../entities/voucher";
import { GetQueryableQuery } from "./base/base-query";

export interface VoucherGetAllQuery extends GetQueryableQuery {
  code?: string | null | undefined;
  description?: string | null | undefined;
  type?: VoucherType | null | undefined;
  status?: VoucherStatus | null | undefined;
  discountAmount?: number | null | undefined;
  discountPercentage?: number | null | undefined;
  minimumSpend?: number | null | undefined;
  maximumDiscount?: number | null | undefined;
  maxUsage?: number | null | undefined;
  maxUsagePerUser?: number | null | undefined;
  usageCount?: number | null | undefined;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  isFirstOrderOnly?: boolean | null | undefined;
  applicableProductIds?: string | null | undefined;
  applicableCategories?: string | null | undefined;
  maximumSpend?: number | null | undefined;
  isCombinableWithOther?: boolean | null | undefined;
  isPublic?: boolean | null | undefined;
  userGroupRestrictions?: string | null | undefined;
}
