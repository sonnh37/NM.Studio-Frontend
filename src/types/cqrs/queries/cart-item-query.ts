import { Product } from "@/types/entities/product";
import { GetQueryableQuery } from "./base/base-query";

export interface CartItemGetAllQuery extends GetQueryableQuery {
  cartId?: string | null | undefined;
  productId?: string | null | undefined;
  quantity?: number | null | undefined;
  selectedSize?: string | null | undefined;
  selectedColor?: string | null | undefined;
  unitPrice?: number | null | undefined;
  totalPrice?: number | null | undefined;
}
