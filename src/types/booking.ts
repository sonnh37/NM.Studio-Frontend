import { BaseEntity } from "./base";
import { Service } from "./service";
import { User } from "./user";

export interface Booking extends BaseEntity {
  userId?: string | null | undefined;
  serviceId?: string | null | undefined;
  fullName?: string | null | undefined;
  email?: string | null | undefined;
  phone?: string | null | undefined;
  bookingDate?: string | null | undefined;
  status?: BookingStatus | null | undefined;
  user?: User | null | undefined;
  service?: Service | null | undefined;
}

export enum BookingStatus {
  Pending,
  Confirmed,
  Cancelled,
}
