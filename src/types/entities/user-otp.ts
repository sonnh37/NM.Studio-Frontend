import { BaseEntity } from "./base/base";
import { User } from "./user";

export interface UserOtp extends BaseEntity {
  userId?: string;
  code: string;
  type: OtpType;
  status: OtpStatus;
  expiredAt: string;
  verifiedAt?: string;
  user?: User;
}

export enum OtpStatus {
  Pending = 0,
  Verified = 1,
  Expired = 2,
  Failed = 3,
}

export enum OtpType {
  Email = 0,
  SMS = 1,
  TwoFactor = 2,
}
