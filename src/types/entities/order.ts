import { BaseEntity } from "./base/base";
import { OrderItem } from "./order-item";
import { OrderStatusHistory } from "./order-status-history";
import {Payment} from "@/types/entities/payment";
import {User} from "@/types/entities/user";
import { Voucher } from "./voucher";

export enum OrderStatus {
    Pending,
    Confirmed,
    Processing,
    ReadyForShipment,
    Shipped,
    Delivered,
    Completed,
    Cancelled,
    Refunded,
    OnHold
}
export enum ShippingMethod {
    Standard,
    Express,
    NextDay,
    PickupInStore
}


export interface Order extends BaseEntity{
    userId?: string;
    orderNumber?: string;
    status: OrderStatus;

    subTotal: number;
    taxAmount: number;
    shippingCost: number;
    discountAmount: number;
    totalAmount: number;

    voucherCode?: string;
    voucherId?: string;

    orderDate: string;
    processedDate?: string;
    completedDate?: string;
    cancelledDate?: string;

    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingZipCode?: string;
    shippingCountry?: string;
    trackingNumber?: string;
    shippingMethod: ShippingMethod;

    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;

    customerNotes?: string;
    internalNotes?: string;

    user?: User;
    voucher?: Voucher;
    orderItems: OrderItem[];
    orderStatusHistories: OrderStatusHistory[];
    payments: Payment[];
}


