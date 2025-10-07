import { ServiceBookingStatus } from "@/types/entities/service-booking";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface ServiceBookingCreateCommand extends CreateCommand {
  userId?: string | null | undefined;
  serviceId?: string | null | undefined;
  bookingNumber?: string | null | undefined;
  status: ServiceBookingStatus;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  servicePrice: number;
  depositAmount: number;
  totalAmount: number;
  isDepositPaid: boolean;
  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;
  specialRequirements?: string | null | undefined;
  staffNotes?: string | null | undefined;
  cancellationReason?: string | null | undefined;
}

export interface ServiceBookingUpdateCommand extends UpdateCommand {
  userId?: string | null | undefined;
  serviceId?: string | null | undefined;
  bookingNumber?: string | null | undefined;
  status: ServiceBookingStatus;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  servicePrice: number;
  depositAmount: number;
  totalAmount: number;
  isDepositPaid: boolean;
  customerName?: string | null | undefined;
  customerEmail?: string | null | undefined;
  customerPhone?: string | null | undefined;
  specialRequirements?: string | null | undefined;
  staffNotes?: string | null | undefined;
  cancellationReason?: string | null | undefined;
}
