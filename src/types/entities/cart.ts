import {BaseEntity} from "@/types/entities/base/base";
import {User} from "@/types/entities/user";
import {CartItem} from "@/types/entities/cart-item";

export interface Cart extends BaseEntity{
    userId?: string;
    expiryDate: string;
    voucherCode?: string;
    subTotal: number;
    discountAmount: number;
    totalAmount: number;
    user?: User;
    items: CartItem[];
}