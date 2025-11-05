import {
  CreateCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";
import { Gender, Role, UserStatus } from "@/types/entities/user";

export interface UserCreateCommand extends CreateCommand {
  
}

export interface UserUpdateCommand extends UpdateCommand {
  
}

export interface UserUpdatePasswordCommand {
  password?: string | null | undefined;
}
