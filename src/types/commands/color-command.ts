import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface ColorCreateCommand extends CreateCommand {
    name?: string | null;
    colorCode?: string | null;
    colorType?: string | null;
    description?: string | null;
    imagePath?: string | null;
    isActive: boolean;
    sortOrder: number;
}

export interface ColorUpdateCommand extends UpdateCommand {
    name?: string | null;
    colorCode?: string | null;
    colorType?: string | null;
    description?: string | null;
    imagePath?: string | null;
    isActive: boolean;
    sortOrder: number;
}
