import {Cart} from "@/types/entities/cart";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class CartService extends BaseService<Cart> {
    constructor() {
        super(`${Constants.CARTS}`);
    }
}

export const cartService = new CartService();
