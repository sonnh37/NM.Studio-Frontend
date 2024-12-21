import { Gender, Role, User, UserStatus } from "@/types/user";
import { Photo } from "@/types/photo";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";

export interface UserCreateCommand extends CreateCommand {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email?: string;
  dob?: string | null; // DateTime sẽ được chuyển thành string (ISO string format)
  address?: string;
  gender?: Gender; // Gender là một enum, sẽ cần được định nghĩa
  phone?: string;
  username?: string;
  password?: string;
  role?: Role; // Role là một enum, sẽ cần được định nghĩa
  avatar?: string;
  status?: UserStatus;
}

export interface UserUpdateCommand extends UpdateCommand {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email?: string;
  dob?: string | null; // DateTime sẽ được chuyển thành string (ISO string format)
  address?: string;
  gender?: Gender; // Gender là một enum, sẽ cần được định nghĩa
  phone?: string;
  username?: string;
  password?: string;
  role?: Role; // Role là một enum, sẽ cần được định nghĩa
  avatar?: string;
  status?: UserStatus;
}

export interface UserUpdatePasswordCommand{
  password?: string;
}
