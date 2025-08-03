import {BaseEntity} from "@/types/entities/base/base";
import { Voucher } from "./voucher";
import { User } from "./user";
import { Order } from "./order";

export interface VoucherUsageHistory extends BaseEntity{
    voucherId?: string;
    userId?: string;
    orderId?: string;
    discountAmount: number;
    usedDate: string;
    voucher?: Voucher;
    user?: User;
    order?: Order;
}