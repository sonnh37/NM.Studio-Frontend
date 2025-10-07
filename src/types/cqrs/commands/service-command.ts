import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export class ServiceCreateCommand extends CreateCommand {
  name: string | null;
  slug: string | null;
  description: string | null;
  price: number | null;
  isFeatured: boolean | null;
  backgroundCoverId: string | null;
  thumbnailId: string | null;
  termsAndConditions: string | null;
  srcThumbnail?: string | null;
  thumbnailFile?: File | null;
}

export interface PackageServiceCommand {}

export class ServiceUpdateCommand extends UpdateCommand {
  name: string | null;
  slug: string | null;
  description: string | null;
  price: number | null;
  isFeatured: boolean | null;
  backgroundCoverId: string | null;
  thumbnailId: string | null;
  termsAndConditions: string | null;
  srcThumbnail?: string | null;
  thumbnailFile?: File | null;
}

export interface ServiceDeleteCommand extends DeleteCommand {}
