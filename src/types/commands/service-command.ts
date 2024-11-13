import {CreateCommand, UpdateCommand} from "./base-command";

export interface ServiceCreateCommand extends CreateCommand {
    name?: string;
    description?: string;
    src?: string;
    price?: number;
}

export interface ServiceUpdateCommand extends UpdateCommand {
    name?: string;
    description?: string;
    src?: string;
    price?: number;
}
