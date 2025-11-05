import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface ColorCreateCommand extends CreateCommand {
    name?: string | null | undefined;
    colorCode?: string | null | undefined;
    colorType?: string | null | undefined;
    description?: string | null | undefined;
    imagePath?: string | null | undefined;
    isActive: boolean;
    sortOrder: number;
}

export interface ColorUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
    colorCode?: string | null | undefined;
    colorType?: string | null | undefined;
    description?: string | null | undefined;
    imagePath?: string | null | undefined;
    isActive: boolean;
    sortOrder: number;
}
