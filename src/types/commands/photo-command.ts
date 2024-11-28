import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";

export interface PhotoCreateCommand extends CreateCommand {
    title?: string;
    description?: string;
    isFeatured: boolean;
    src?: string;
    href?: string;
    tag?: string;
}

export interface PhotoUpdateCommand extends UpdateCommand {
    title?: string;
    description?: string;
    isFeatured: boolean;
    src?: string;
    href?: string;
    tag?: string;
}
