import {BookingStatus} from "../booking";
import {CreateCommand, UpdateCommand} from "./base-command";

export interface BookingCreateCommand extends CreateCommand {
    userId?: string | null | undefined;
    serviceId?: string | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    bookingDate?: string | null | undefined;
    status?: BookingStatus | null | undefined;
}

export interface BookingUpdateCommand extends UpdateCommand {
    userId?: string | null | undefined;
    serviceId?: string | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    bookingDate?: string | null | undefined;
    status?: BookingStatus | null | undefined;
}
