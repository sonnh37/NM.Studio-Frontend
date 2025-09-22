import { Order } from "@/types/entities/order";
import { PaymentMethod, PaymentStatus } from "../entities/payment";
import { GetQueryableQuery } from "./base/base-query";

export interface PaymentGetAllQuery extends GetQueryableQuery {
  orderId?: string | null | undefined;
  transactionId?: string | null | undefined;
  paymentMethod?: PaymentMethod | null | undefined;
  status?: PaymentStatus | null | undefined;
  amount?: number | null | undefined;
  currency?: string | null | undefined;
  paymentDate?: string | null | undefined;
  processedDate?: string | null | undefined;
  billingName?: string | null | undefined;
  billingEmail?: string | null | undefined;
  billingPhone?: string | null | undefined;
  billingAddress?: string | null | undefined;
  paymentProviderResponse?: string | null | undefined;
  failureReason?: string | null | undefined;
}
