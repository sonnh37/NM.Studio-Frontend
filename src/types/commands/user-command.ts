import {CreateCommand, UpdateCommand} from "@/types/commands/base/base-command";
import {Gender, Role, UserStatus} from "@/types/entities/user";

export interface UserCreateCommand extends CreateCommand {
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    avatar?: string | null;
    email?: string | null;
    dob?: string | null;
    address?: string | null;
    gender?: Gender | null;
    phone?: string | null;
    username?: string | null;
    password?: string | null;
    role?: Role | null;
    status?: UserStatus | null;
    cache?: string | null;
    otp?: string | null;
    otpExpiration?: string | null;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    twoFactorEnabled: boolean;
    lastLoginDate?: string | null;
    lastLoginIp?: string | null;
    failedLoginAttempts: number;
    lockoutEnd?: string | null;
    nationality?: string | null;
    preferredLanguage?: string | null;
    timeZone?: string | null;
    passwordChangedDate?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpiration?: string | null;

    file?: File | null;
}

export interface UserUpdateCommand extends UpdateCommand {
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    avatar?: string | null;
    email?: string | null;
    dob?: string | null;
    address?: string | null;
    gender?: Gender | null;
    phone?: string | null;
    username?: string | null;
    password?: string | null;
    role?: Role | null;
    status?: UserStatus | null;
    cache?: string | null;
    otp?: string | null;
    otpExpiration?: string | null;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    twoFactorEnabled: boolean;
    lastLoginDate?: string | null;
    lastLoginIp?: string | null;
    failedLoginAttempts: number;
    lockoutEnd?: string | null;
    nationality?: string | null;
    preferredLanguage?: string | null;
    timeZone?: string | null;
    passwordChangedDate?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpiration?: string | null;

    file?: File | null;
}

export interface UserUpdatePasswordCommand {
    password?: string | null | undefined;
}
