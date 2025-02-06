import {CreateCommand, UpdateCommand} from "./base-command";

export interface ServiceCreateCommand extends CreateCommand {
    name?: string | null | undefined;
    description?: string | null | undefined;
    src?: string | null | undefined;
    slug?: string | null | undefined;
    price?: number | null | undefined;
    file?: File | null;
}

export interface ServiceUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
    description?: string | null | undefined;
    src?: string | null | undefined;
    slug?: string | null | undefined;
    price?: number | null | undefined;
    file?: File | null;
}
