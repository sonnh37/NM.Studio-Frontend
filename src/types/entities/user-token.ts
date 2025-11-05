import { BaseEntity } from "./base/base";
import { User } from "./user";

export interface UserToken extends BaseEntity {
  userId?: string;
  refreshToken?: string;
  userAgent?: string;
  ipAddress?: string;
  expiryTime?: string;
  user?: User;
}
