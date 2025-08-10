import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface SizeCreateCommand extends CreateCommand {
  name?: string | null | undefined;
  displayName?: string | null | undefined;
  description?: string | null | undefined;
  bust?: number | null | undefined;
  waist?: number | null | undefined;
  hip?: number | null | undefined;
  length?: number | null | undefined;
  sizeGuide?: string | null | undefined;
  isActive: boolean;
  sortOrder: number;
}

export interface SizeUpdateCommand extends UpdateCommand {
  name?: string | null | undefined;
  displayName?: string | null | undefined;
  description?: string | null | undefined;
  bust?: number | null | undefined;
  waist?: number | null | undefined;
  hip?: number | null | undefined;
  length?: number | null | undefined;
  sizeGuide?: string | null | undefined;
  isActive: boolean;
  sortOrder: number;
}
