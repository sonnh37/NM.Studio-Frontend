import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";

export interface PhotoCreateCommand extends CreateCommand {
    title?: string | null | undefined;
    description?: string | null | undefined;
    isFeatured?: boolean;
    src?: string | null | undefined;
    href?: string | null | undefined;
    tag?: string | null | undefined;
}

export interface PhotoUpdateCommand extends UpdateCommand {
    title?: string | null | undefined;
    description?: string | null | undefined;
    isFeatured?: boolean;
    src?: string | null | undefined;
    href?: string | null | undefined;
    tag?: string | null | undefined;
}
