import { Order, OrderStatus } from "@/types/entities/order";
import { BaseEntity } from "@/types/entities/base/base";

export interface OrderStatusHistory extends BaseEntity {
  orderId?: string;
  status: OrderStatus;
  previousStatus?: OrderStatus;
  comment?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  isCustomerNotified: boolean;
  notificationError?: string;
  order?: Order;
}
