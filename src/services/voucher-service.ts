import {Voucher} from "@/types/entities/voucher";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class VoucherService extends BaseService<Voucher> {
    constructor() {
        super(`${Const.VOUCHERS}`);
    }
}

export const voucherService = new VoucherService();
