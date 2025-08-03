import {Order} from "@/types/entities/order";
import {BaseEntity} from "@/types/entities/base/base";
import { Product } from "./product";

export interface OrderItem extends BaseEntity{
    orderId?: string;
    productId?: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    discountAmount: number;
    totalAmount: number;
    selectedSize?: string;
    selectedColor?: string;
    customizationNotes?: string;
    order?: Order;
    product?: Product;
}