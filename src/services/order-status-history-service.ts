import {OrderStatusHistory} from "@/types/entities/order-status-history";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class OrderStatusHistoryService extends BaseService<OrderStatusHistory> {
    constructor() {
        super(`${Const.ORDER_STATUS_HISTORIES}`);
    }
}

export const orderstatushistoryService = new OrderStatusHistoryService();
