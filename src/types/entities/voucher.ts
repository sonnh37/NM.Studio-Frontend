import { BaseEntity } from "@/types/entities/base/base";
import { Order } from "./order";
import { VoucherUsageHistory } from "./voucher-usage-history";

export enum VoucherType {
  FixedAmount,
  Percentage,
  FreeShipping,
  BuyOneGetOne,
  FirstOrder,
  ReferralReward,
  Seasonal,
  BirthdaySpecial,
  LoyaltyReward,
  WelcomeBack,
}

export enum VoucherStatus {
  Active,
  Inactive,
  Expired,
  FullyRedeemed,
  Cancelled,
  Scheduled,
  Draft,
}

export interface Voucher extends BaseEntity {
  code: string;
  description?: string;
  type: VoucherType;
  status: VoucherStatus;
  discountAmount: number;
  discountPercentage: number;
  minimumSpend: number;
  maximumDiscount: number;
  maxUsage: number;
  maxUsagePerUser: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  isFirstOrderOnly: boolean;
  applicableProductIds?: string;
  applicableCategories?: string;
  maximumSpend?: number;
  isCombinableWithOther: boolean;
  isFeatured: boolean;
  userGroupRestrictions?: string;
  orders: Order[];
  voucherUsageHistories: VoucherUsageHistory[];
}
