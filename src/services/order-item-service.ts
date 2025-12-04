import {OrderItem} from "@/types/entities/order-item";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class OrderItemService extends BaseService<OrderItem> {
    constructor() {
        super(`${Constants.ORDER_ITEMS}`);
    }
}

export const orderitemService = new OrderItemService();
