import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface CartCreateCommand extends CreateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  background?: string | null | undefined;
  eventDate?: string | null | undefined;
  brideName?: string | null | undefined;
  groomName?: string | null | undefined;
  location?: string | null | undefined;
  photographer?: string | null | undefined;
  isPublic: boolean;
  file?: File | null | undefined;
}

export interface CartUpdateCommand extends UpdateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  background?: string | null | undefined;
  eventDate?: string | null | undefined;
  brideName?: string | null | undefined;
  groomName?: string | null | undefined;
  location?: string | null | undefined;
  photographer?: string | null | undefined;
  isPublic: boolean;
  file?: File | null | undefined;
}
