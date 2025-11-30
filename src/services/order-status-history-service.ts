import {OrderStatusHistory} from "@/types/entities/order-status-history";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class OrderStatusHistoryService extends BaseService<OrderStatusHistory> {
    constructor() {
        super(`${Constants.ORDER_STATUS_HISTORIES}`);
    }
}

export const orderstatushistoryService = new OrderStatusHistoryService();
