import {
  CreateCommand,
  UpdateCommand,
} from "@/types/commands/base/base-command";
import { Gender, Role, UserStatus } from "@/types/entities/user";

export interface UserCreateCommand extends CreateCommand {
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
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginDate?: string | null | undefined;
  lastLoginIp?: string | null | undefined;
  failedLoginAttempts: number;
  lockoutEnd?: string | null | undefined;
  nationality?: string | null | undefined;
  preferredLanguage?: string | null | undefined;
  timeZone?: string | null | undefined;
  passwordChangedDate?: string | null | undefined;
  passwordResetToken?: string | null | undefined;
  passwordResetExpiration?: string | null | undefined;

  file?: File | null | undefined;
}

export interface UserUpdateCommand extends UpdateCommand {
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
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginDate?: string | null | undefined;
  lastLoginIp?: string | null | undefined;
  failedLoginAttempts: number;
  lockoutEnd?: string | null | undefined;
  nationality?: string | null | undefined;
  preferredLanguage?: string | null | undefined;
  timeZone?: string | null | undefined;
  passwordChangedDate?: string | null | undefined;
  passwordResetToken?: string | null | undefined;
  passwordResetExpiration?: string | null | undefined;

  file?: File | null | undefined;
}

export interface UserUpdatePasswordCommand {
  password?: string | null | undefined;
}
