import { BookingStatus } from "../booking";
import {CreateCommand, UpdateCommand} from "./base-command";

export interface BookingCreateCommand extends CreateCommand {
    userId?: string;  
    serviceId?: string; 
    fullName?: string;
    email?: string;
    phone?: string;
    bookingDate?: string;
    status?: BookingStatus;  
}

export interface BookingUpdateCommand extends UpdateCommand {
    userId?: string;  
    serviceId?: string; 
    fullName?: string;
    email?: string;
    phone?: string;
    bookingDate?: string;
    status?: BookingStatus;  
}
