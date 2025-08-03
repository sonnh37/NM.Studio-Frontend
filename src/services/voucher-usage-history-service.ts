import {VoucherUsageHistory} from "@/types/entities/voucher-usage-history";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class VoucherUsageHistoryService extends BaseService<VoucherUsageHistory> {
    constructor() {
        super(`${Const.VOUCHER_USAGE_HISTORIES}`);
    }
}

export const voucherusagehistoryService = new VoucherUsageHistoryService();
