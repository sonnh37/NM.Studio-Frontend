import { Booking } from "./booking";

export interface User {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email?: string;
  dob?: string | null; // DateTime sẽ được chuyển thành string (ISO string format)
  address?: string;
  gender?: Gender; // Gender là một enum, sẽ cần được định nghĩa
  phone?: string;
  username?: string;
  password?: string;
  role?: Role; // Role là một enum, sẽ cần được định nghĩa
  avatar?: string;
  status?: UserStatus; // UserStatus là một enum, sẽ cần được định nghĩa
  bookings?: Booking[]; // Bookings là mảng các đối tượng Booking, sẽ cần được định nghĩa
}
export enum Gender {
  Male,   // 0
  Female, // 1
  Other,  // 2
}

export enum Role {
  Admin,  // 0
  Staff,  // 1
  Customer, // 2
}

export enum UserStatus {
  Active,    // 0
  Inactive,  // 1
  Suspended, // 2
}


