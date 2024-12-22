import {CreateCommand, UpdateCommand} from "./base-command";

export interface SizeCreateCommand extends CreateCommand {
    name?: string | null | undefined;
}

export interface SizeUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
}
