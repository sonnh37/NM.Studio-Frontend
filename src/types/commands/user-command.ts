import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";
import {Gender, Role, UserStatus} from "@/types/user";

export interface UserCreateCommand extends CreateCommand {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
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
    preferences?: string | null | undefined;
}

export interface UserUpdateCommand extends UpdateCommand {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
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
    preferences?: string | null | undefined;
}

export interface UserUpdatePasswordCommand {
    password?: string | null | undefined;
}
