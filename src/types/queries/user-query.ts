import { Gender, Role, UserStatus } from "../entities/user";
import { GetQueryableQuery } from "./base/base-query";

export interface UserGetAllQuery extends GetQueryableQuery {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  fullName?: string | null | undefined;
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
  cache?: string | null | undefined;
  otp?: string | null | undefined;
  otpExpiration?: string | null | undefined;
  isEmailVerified?: boolean | null | undefined;
  isPhoneVerified?: boolean | null | undefined;
  twoFactorEnabled?: boolean | null | undefined;
  lastLoginDate?: string | null | undefined;
  lastLoginIp?: string | null | undefined;
  failedLoginAttempts?: number | null | undefined;
  lockoutEnd?: string | null | undefined;
  nationality?: string | null | undefined;
  preferredLanguage?: string | null | undefined;
  timeZone?: string | null | undefined;
  passwordChangedDate?: string | null | undefined;
  passwordResetToken?: string | null | undefined;
  passwordResetExpiration?: string | null | undefined;
}
