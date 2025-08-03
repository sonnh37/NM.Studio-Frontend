import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface SizeCreateCommand extends CreateCommand {
    name?: string | null;
    displayName?: string | null;
    description?: string | null;
    bust?: number | null;
    waist?: number | null;
    hip?: number | null;
    length?: number | null;
    sizeGuide?: string | null;
    isActive: boolean;
    sortOrder: number;
}

export interface SizeUpdateCommand extends UpdateCommand {
    name?: string | null;
    displayName?: string | null;
    description?: string | null;
    bust?: number | null;
    waist?: number | null;
    hip?: number | null;
    length?: number | null;
    sizeGuide?: string | null;
    isActive: boolean;
    sortOrder: number;
}
