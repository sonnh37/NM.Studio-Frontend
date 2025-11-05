import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface OrderItemCreateCommand extends CreateCommand {
  orderId?: string | null | undefined;
  productId?: string | null | undefined;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  selectedSize?: string | null | undefined;
  selectedColor?: string | null | undefined;
  customizationNotes?: string | null | undefined;
}

export interface OrderItemUpdateCommand extends UpdateCommand {
  orderId?: string | null | undefined;
  productId?: string | null | undefined;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  selectedSize?: string | null | undefined;
  selectedColor?: string | null | undefined;
  customizationNotes?: string | null | undefined;
}
