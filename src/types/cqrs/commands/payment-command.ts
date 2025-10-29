import { PaymentMethod, PaymentStatus } from "../entities/payment";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface PaymentCreateCommand extends CreateCommand {
  orderId?: string | null | undefined;
  transactionId?: string | null | undefined;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paymentDate: string;
  processedDate?: string | null | undefined;
  billingName?: string | null | undefined;
  billingEmail?: string | null | undefined;
  billingPhone?: string | null | undefined;
  billingAddress?: string | null | undefined;
  paymentProviderResponse?: string | null | undefined;
  failureReason?: string | null | undefined;
}

export interface PaymentUpdateCommand extends UpdateCommand {
  orderId?: string | null | undefined;
  transactionId?: string | null | undefined;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paymentDate: string;
  processedDate?: string | null | undefined;
  billingName?: string | null | undefined;
  billingEmail?: string | null | undefined;
  billingPhone?: string | null | undefined;
  billingAddress?: string | null | undefined;
  paymentProviderResponse?: string | null | undefined;
  failureReason?: string | null | undefined;
}
