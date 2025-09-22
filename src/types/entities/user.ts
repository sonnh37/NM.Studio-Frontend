import { BaseEntity } from "./base/base";
import { MediaBase } from "./media-base";
import { UserOtp } from "./user-otp";
import { UserSession } from "./user-session";
import { UserSetting } from "./user-setting";
import { UserToken } from "./user-token";

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
  displayName?: string;
  avatarId?: string;
  email?: string;
  dob?: string; // DateTimeOffset
  address?: string;
  gender?: Gender;
  phone?: string;
  username?: string;
  role?: Role;
  status?: UserStatus;

  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;

  nationality?: string;
  preferredLanguage?: string;
  timeZone?: string;

  avatar?: MediaBase;
  userSetting?: UserSetting;
  userOtps: UserOtp[];
  userTokens: UserToken[];
  userSessions: UserSession[];
}









