import { BaseEntity } from "./base/base";
import { Blog } from "./blog";
import { Order } from "./order";
import { RefreshToken } from "./refresh-token";
import { ServiceBooking } from "./service-booking";
import { VoucherUsageHistory } from "./voucher-usage-history";
import { Cart } from "@/types/entities/cart";

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

export interface User extends BaseEntity {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
  dob?: string;
  address?: string;
  gender?: Gender;
  phone?: string;
  username?: string;
  password?: string;
  role?: Role;
  status?: UserStatus;
  cache?: string;
  otp?: string;
  otpExpiration?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginDate?: string;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  lockoutEnd?: string;
  nationality?: string;
  preferredLanguage?: string;
  timeZone?: string;
  passwordChangedDate?: string;
  passwordResetToken?: string;
  passwordResetExpiration?: string;
  refreshTokens: RefreshToken[];
  serviceBookings: ServiceBooking[];
  orders: Order[];
  voucherUsageHistories: VoucherUsageHistory[];
  blogs: Blog[];
  carts: Cart[];
}
