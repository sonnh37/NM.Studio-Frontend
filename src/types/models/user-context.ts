import { Role } from "../entities/user";

export interface UserContext {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  displayName?: string;
  avatarUrl?: string;
  email?: string;
  dob?: string;
  address?: string;
  gender?: string;
  phone?: string;
  username?: string;
  password?: string;
  role?: Role;
  status?: string;

  // Verification
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;

  // Profile
  nationality?: string;
  preferredLanguage?: string;
  timeZone?: string;
}
