import { BaseEntity } from "./base/base";
import { User } from "./user";

export interface UserSetting extends BaseEntity {
  userId?: string;
  key?: string;
  value?: string;
  user?: User;
}
