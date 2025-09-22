import { GetQueryableQuery } from "./base/base-query";

export interface OrderItemGetAllQuery extends GetQueryableQuery {
  orderId?: string | null | undefined;
  productId?: string | null | undefined;
  quantity?: number | null | undefined;
  unitPrice?: number | null | undefined;
  subtotal?: number | null | undefined;
  discountAmount?: number | null | undefined;
  totalAmount?: number | null | undefined;
  selectedSize?: string | null | undefined;
  selectedColor?: string | null | undefined;
  customizationNotes?: string | null | undefined;
}
