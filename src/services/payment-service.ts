import {Payment} from "@/types/entities/payment";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class PaymentService extends BaseService<Payment> {
    constructor() {
        super(`${Constants.PAYMENTS}`);
    }
}

export const paymentService = new PaymentService();
