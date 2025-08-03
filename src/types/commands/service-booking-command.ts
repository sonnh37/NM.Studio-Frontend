import {ServiceBookingStatus} from "../entities/service-booking";
import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface ServiceBookingCreateCommand extends CreateCommand {
    userId?: string | null;
    serviceId?: string | null;
    bookingNumber?: string | null;
    status: ServiceBookingStatus;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    servicePrice: number;
    depositAmount: number;
    totalAmount: number;
    isDepositPaid: boolean;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    specialRequirements?: string | null;
    staffNotes?: string | null;
    cancellationReason?: string | null;
}

export interface ServiceBookingUpdateCommand extends UpdateCommand {
    userId?: string | null;
    serviceId?: string | null;
    bookingNumber?: string | null;
    status: ServiceBookingStatus;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    servicePrice: number;
    depositAmount: number;
    totalAmount: number;
    isDepositPaid: boolean;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    specialRequirements?: string | null;
    staffNotes?: string | null;
    cancellationReason?: string | null;
}
