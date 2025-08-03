import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface CartItemCreateCommand extends CreateCommand {
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    background?: string | null;
    eventDate?: string | null;
    brideName?: string | null;
    groomName?: string | null;
    location?: string | null;
    photographer?: string | null;
    isPublic: boolean;
    file?: File | null;
}

export interface CartItemUpdateCommand extends UpdateCommand {
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    background?: string | null;
    eventDate?: string | null;
    brideName?: string | null;
    groomName?: string | null;
    location?: string | null;
    photographer?: string | null;
    isPublic: boolean;
    file?: File | null;
}
