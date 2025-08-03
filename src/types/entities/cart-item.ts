import {BaseEntity} from "@/types/entities/base/base";
import {Cart} from "./cart";
import {Product} from "@/types/entities/product";

export interface CartItem extends BaseEntity {
    cartId?: string;
    productId?: string;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
    unitPrice: number;
    totalPrice: number;
    cart?: Cart;
    product?: Product;
}