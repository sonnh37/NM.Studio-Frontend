import { OrderStatus } from "../entities/order";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface OrderStatusHistoryCreateCommand extends CreateCommand {
  orderId?: string | null | undefined;
  status: OrderStatus;
  previousStatus?: OrderStatus | null | undefined;
  comment?: string | null | undefined;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  location?: string | null | undefined;
  isCustomerNotified: boolean;
  notificationError?: string | null | undefined;
}

export interface OrderStatusHistoryUpdateCommand extends UpdateCommand {
  orderId?: string | null | undefined;
  status: OrderStatus;
  previousStatus?: OrderStatus | null | undefined;
  comment?: string | null | undefined;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  location?: string | null | undefined;
  isCustomerNotified: boolean;
  notificationError?: string | null | undefined;
}
