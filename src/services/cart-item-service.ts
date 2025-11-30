import {CartItem} from "@/types/entities/cart-item";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class CartItemService extends BaseService<CartItem> {
    constructor() {
        super(`${Constants.CART_ITEMS}`);
    }
}

export const cartitemService = new CartItemService();
