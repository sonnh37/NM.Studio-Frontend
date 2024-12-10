import { BaseEntity } from "./base";
import { Service } from "./service";
import { User } from "./user";

export interface Booking extends BaseEntity {
  userId?: string;
  serviceId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  bookingDate?: string;
  status?: BookingStatus;
  user?: User;
  service?: Service;
}

export enum BookingStatus {
  Pending,
  Confirmed,
  Cancelled,
}
