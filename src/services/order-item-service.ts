import {OrderItem} from "@/types/entities/order-item";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class OrderItemService extends BaseService<OrderItem> {
    constructor() {
        super(`${Const.ORDER_ITEMS}`);
    }
}

export const orderitemService = new OrderItemService();
