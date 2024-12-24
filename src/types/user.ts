import {BaseEntity} from "./base";
import {Booking} from "./booking";

export interface User extends BaseEntity {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    avatar?: string | null | undefined;
    email?: string | null | undefined;
    dob?: string | null | undefined;
    address?: string | null | undefined;
    gender?: Gender | null | undefined;
    phone?: string | null | undefined;
    username?: string | null | undefined;
    password?: string | null | undefined;
    role?: Role | null | undefined;
    status?: UserStatus | null | undefined;
    preferences?: string | null | undefined;
    bookings?: Booking[];
}

export enum Gender {
    Male,
    Female,
    Other,
}

export enum Role {
    Admin,
    Staff,
    Customer,
}

export enum UserStatus {
    Active,
    Inactive,
    Suspended,
}



