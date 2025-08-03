import {BaseEntity} from "./base/base";
import {Service} from "./service";
import {User} from "./user";

export enum ServiceBookingStatus {
    Pending,
    Confirmed,
    Completed,
    Cancelled
}

export interface ServiceBooking {
    userId?: string;
    serviceId?: string;
    bookingNumber?: string;
    status: ServiceBookingStatus;
    appointmentDate: string;
    startTime: string;
    endTime: string;
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