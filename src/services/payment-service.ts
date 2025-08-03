import {Payment} from "@/types/entities/payment";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class PaymentService extends BaseService<Payment> {
    constructor() {
        super(`${Const.PAYMENTS}`);
    }
}

export const paymentService = new PaymentService();
