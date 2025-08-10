import { ServiceBookingStatus } from "../entities/service-booking";
import { GetQueryableQuery } from "./base/base-query";

export interface ServiceBookingGetAllQuery extends GetQueryableQuery {
  userId?: string | null | undefined;
  serviceId?: string | null | undefined;
  bookingNumber?: string | null | undefined;
  status?: ServiceBookingStatus | null | undefined;
  appointmentDate?: string | null | undefined;
  startTime?: string | null | undefined;
  endTime?: string | null | undefined;
  durationMinutes?: number | null | undefined;
  servicePrice?: number | null | undefined;
  depositAmount?: number | null | undefined;
  totalAmount?: number | null | undefined;
  isDepositPaid?: boolean | null | undefined;
  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;
  specialRequirements?: string | null | undefined;
  staffNotes?: string | null | undefined;
  cancellationReason?: string | null | undefined;
}
