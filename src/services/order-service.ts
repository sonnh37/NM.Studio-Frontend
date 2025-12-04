import {Order} from "@/types/entities/order";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class OrderService extends BaseService<Order> {
    constructor() {
        super(`${Constants.ORDERS}`);
    }
}

export const orderService = new OrderService();
