import {CreateCommand, UpdateCommand} from "./base-command";

export interface ColorCreateCommand extends CreateCommand {
    name?: string;
}

export interface ColorUpdateCommand extends UpdateCommand {
    name?: string;
}
