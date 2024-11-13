import {CreateCommand, UpdateCommand} from "./base-command";

export interface SizeCreateCommand extends CreateCommand {
    name?: string;
}

export interface SizeUpdateCommand extends UpdateCommand {
    name?: string;
}
