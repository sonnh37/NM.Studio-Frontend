import {CartItem} from "@/types/entities/cart-item";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class CartItemService extends BaseService<CartItem> {
    constructor() {
        super(`${Const.CART_ITEMS}`);
    }
}

export const cartitemService = new CartItemService();
