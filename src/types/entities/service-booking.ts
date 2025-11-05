import { BaseEntity } from "./base/base";
import { Service } from "./service";
import { User } from "./user";


export interface ServiceBooking extends BaseEntity {
  userId?: string;
  serviceId?: string;
  bookingNumber?: string;
  status: ServiceBookingStatus;

  appointmentDate: string; // DateTimeOffset -> string
  startTime: string;       // TimeSpan -> string
  endTime: string;         // TimeSpan -> string
  durationMinutes: number;

  servicePrice: number;
  depositAmount: number;
  totalAmount: number;
  isDepositPaid: boolean;

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  specialRequirements?: string;
  staffNotes?: string;
  cancellationReason?: string;

  user?: User;
  service?: Service;
}

export enum ServiceBookingStatus {
  Pending,
  Confirmed,
  Completed,
  Cancelled
}