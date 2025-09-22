import { OrderStatus, ShippingMethod } from "../entities/order";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface OrderCreateCommand extends CreateCommand {
  userId?: string | null | undefined;
  orderNumber?: string | null | undefined;
  status: OrderStatus;

  subTotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;

  voucherCode?: string | null | undefined;
  voucherId?: string | null | undefined;

  orderDate: string;
  processedDate?: string | null | undefined;
  completedDate?: string | null | undefined;
  cancelledDate?: string | null | undefined;

  shippingAddress?: string | null | undefined;
  shippingCity?: string | null | undefined;
  shippingState?: string | null | undefined;
  shippingZipCode?: string | null | undefined;
  shippingCountry?: string | null | undefined;
  trackingNumber?: string | null | undefined;
  shippingMethod: ShippingMethod;

  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;

  customerNotes?: string | null | undefined;
  internalNotes?: string | null | undefined;
  file?: File | null | null | undefined;
}

export interface OrderUpdateCommand extends UpdateCommand {
  userId?: string | null | undefined;
  orderNumber?: string | null | undefined;
  status: OrderStatus;

  subTotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;

  voucherCode?: string | null | undefined;
  voucherId?: string | null | undefined;

  orderDate: string;
  processedDate?: string | null | undefined;
  completedDate?: string | null | undefined;
  cancelledDate?: string | null | undefined;

  shippingAddress?: string | null | undefined;
  shippingCity?: string | null | undefined;
  shippingState?: string | null | undefined;
  shippingZipCode?: string | null | undefined;
  shippingCountry?: string | null | undefined;
  trackingNumber?: string | null | undefined;
  shippingMethod: ShippingMethod;

  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;

  customerNotes?: string | null | undefined;
  internalNotes?: string | null | undefined;
  file?: File | null | null | undefined;
}
