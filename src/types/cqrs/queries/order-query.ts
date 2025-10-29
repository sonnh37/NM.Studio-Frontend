import { OrderStatus, ShippingMethod } from "../entities/order";
import { GetQueryableQuery } from "./base/base-query";

export interface OrderGetAllQuery extends GetQueryableQuery {
  userId?: string | null | undefined;
  orderNumber?: string | null | undefined;
  status?: OrderStatus | null | undefined;

  subTotal?: number | null | undefined;
  taxAmount?: number | null | undefined;
  shippingCost?: number | null | undefined;
  discountAmount?: number | null | undefined;
  totalAmount?: number | null | undefined;

  voucherCode?: string | null | undefined;
  voucherId?: string | null | undefined;

  orderDate?: string | null | undefined;
  processedDate?: string | null | undefined;
  completedDate?: string | null | undefined;
  cancelledDate?: string | null | undefined;

  shippingAddress?: string | null | undefined;
  shippingCity?: string | null | undefined;
  shippingState?: string | null | undefined;
  shippingZipCode?: string | null | undefined;
  shippingCountry?: string | null | undefined;
  trackingNumber?: string | null | undefined;
  shippingMethod?: ShippingMethod | null | undefined;

  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;

  customerNotes?: string | null | undefined;
  internalNotes?: string | null | undefined;
}
