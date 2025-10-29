import { BaseEntity } from "./base/base";
import { User } from "./user";

export interface UserSession extends BaseEntity {
  userId?: string;
  loginDate: string;
  loginIp?: string;
  deviceInfo?: string;
  sessionToken?: string;
  lastActivity?: string;
  expiration?: string;
  isActive: boolean;
  failedLoginAttempts: number;
  lockoutEnd?: string;
  user?: User;
}