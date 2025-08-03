import {Order} from "@/types/entities/order";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class OrderService extends BaseService<Order> {
    constructor() {
        super(`${Const.ORDERS}`);
    }
}

export const orderService = new OrderService();
