import { BaseEntity } from "@/types/entities/base/base";
import { User } from "@/types/entities/user";
import { CartItem } from "@/types/entities/cart-item";
import { GetQueryableQuery } from "./base/base-query";

export interface CartGetAllQuery extends GetQueryableQuery {
  userId?: string | null | undefined;
  expiryDate?: string | null | undefined;
  voucherCode?: string | null | undefined;
  subTotal?: number | null | undefined;
  discountAmount?: number | null | undefined;
  totalAmount?: number | null | undefined;
}
