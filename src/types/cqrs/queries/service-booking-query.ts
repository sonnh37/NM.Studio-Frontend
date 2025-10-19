import { ServiceBookingStatus } from "@/types/entities/service-booking";
import { GetQueryableQuery } from "./base/base-query";

export interface ServiceBookingGetAllQuery extends GetQueryableQuery {
  userId?: string | null;
  serviceId?: string | null;
  bookingNumber?: string | null;
  status?: ServiceBookingStatus | null;
  appointmentDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  durationMinutes?: number | null;
  servicePrice?: number | null;
  depositAmount?: number | null;
  totalAmount?: number | null;
  isDepositPaid?: boolean | null;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  specialRequirements?: string | null;
  staffNotes?: string | null;
  cancellationReason?: string | null;
}
