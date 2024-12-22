import {CreateCommand, UpdateCommand} from "./base-command";

export interface ColorCreateCommand extends CreateCommand {
    name?: string | null | undefined;
}

export interface ColorUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
}
