import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface CartItemCreateCommand extends CreateCommand {
  cartId?: string | undefined;
  productId?: string | undefined;
  quantity: number;
  selectedSize?: string | undefined;
  selectedColor?: string | undefined;
  unitPrice: number;
  totalPrice: number;
}

export interface CartItemUpdateCommand extends UpdateCommand {
  cartId?: string | undefined;
  productId?: string | undefined;
  quantity: number;
  selectedSize?: string | undefined;
  selectedColor?: string | undefined;
  unitPrice: number;
  totalPrice: number;
}
