import {Cart} from "@/types/entities/cart";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class CartService extends BaseService<Cart> {
    constructor() {
        super(`${Const.CARTS}`);
    }
}

export const cartService = new CartService();
