import { VoucherStatus, VoucherType } from "../entities/voucher";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface VoucherCreateCommand extends CreateCommand {
  code: string;
  description?: string | null | undefined;
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
  applicableProductIds?: string | null | undefined;
  applicableCategories?: string | null | undefined;
  maximumSpend?: number | null | undefined;
  isCombinableWithOther: boolean;
  isPublic: boolean;
  userGroupRestrictions?: string | null | undefined;
}

export interface VoucherUpdateCommand extends UpdateCommand {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  background?: string | null;
  eventDate?: string | null;
  brideName?: string | null;
  groomName?: string | null;
  location?: string | null;
  photographer?: string | null;
  isPublic: boolean;
  file?: File | null;
}
