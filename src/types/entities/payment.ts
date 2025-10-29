import { Order } from "@/types/entities/order";

export interface Payment {
  orderId?: string;
  transactionId?: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paymentDate: string;
  processedDate?: string;
  billingName?: string;
  billingEmail?: string;
  billingPhone?: string;
  billingAddress?: string;
  paymentProviderResponse?: string;
  failureReason?: string;
  order?: Order;
}

export enum PaymentMethod {
  CreditCard,
  DebitCard,
  BankTransfer,
  DigitalWallet,
  Cash,
  CryptoCurrency,
}

export enum PaymentStatus {
  Pending,
  Processing,
  Completed,
  Failed,
  Refunded,
  PartiallyRefunded,
  Cancelled,
}
