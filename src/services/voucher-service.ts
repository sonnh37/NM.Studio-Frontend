import {Voucher} from "@/types/entities/voucher";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class VoucherService extends BaseService<Voucher> {
    constructor() {
        super(`${Constants.VOUCHERS}`);
    }
}

export const voucherService = new VoucherService();
