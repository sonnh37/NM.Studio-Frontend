import { CreateCommand, UpdateCommand } from "./base-command";

export interface AlbumCreateCommand extends CreateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  background?: string | null | undefined;
}

export interface AlbumUpdateCommand extends UpdateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  background?: string | null | undefined;
}
