import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export interface ServiceCreateCommand extends CreateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  price?: number | null;
  isFeatured: boolean | null;
  backgroundCoverId?: string | null;
  thumbnailId?: string | null;
  termsAndConditions?: string | null;
}

export interface PackageServiceCommand {}

export interface ServiceUpdateCommand extends UpdateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  price?: number | null;
  isFeatured: boolean | null;
  backgroundCoverId?: string | null;
  thumbnailId?: string | null;
  termsAndConditions?: string | null;
}

export interface ServiceDeleteCommand extends DeleteCommand {}
