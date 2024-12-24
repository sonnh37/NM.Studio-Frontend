import {CreateCommand, UpdateCommand} from "./base-command";

export interface BlogCreateCommand extends CreateCommand {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    content?: string | null | undefined;
    isFeatured?: boolean;
    thumbnail?: string | null | undefined;
}

export interface BlogUpdateCommand extends UpdateCommand {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    content?: string | null | undefined;
    isFeatured?: boolean;
    thumbnail?: string | null | undefined;
}
