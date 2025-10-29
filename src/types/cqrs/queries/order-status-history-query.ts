import { Order, OrderStatus } from "@/types/entities/order";
import { BaseEntity } from "@/types/entities/base/base";
import { GetQueryableQuery } from "./base/base-query";

export interface OrderStatusHistoryGetAllQuery extends GetQueryableQuery {
  orderId?: string | null | undefined;
  status?: OrderStatus | null | undefined;
  previousStatus?: OrderStatus | null | undefined;
  comment?: string | null | undefined;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  location?: string | null | undefined;
  isCustomerNotified?: boolean | null | undefined;
  notificationError?: string | null | undefined;
}
