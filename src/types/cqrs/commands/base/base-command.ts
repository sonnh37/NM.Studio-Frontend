// Base cho tất cả command
export interface BaseCommand {
  // có thể add metadata chung sau này (vd: userId, correlationId...)
}

// Base cho Create & Update (chung field)
export interface CreateOrUpdateCommand extends BaseCommand {}

// Create
export interface CreateCommand extends CreateOrUpdateCommand {}

// Update
export interface UpdateCommand extends CreateOrUpdateCommand {
  id?: string | null;
  isDeleted?: boolean | null;
}

// Delete
export interface DeleteCommand extends BaseCommand {
  id: string;
  isPermanent?: boolean | null;
}
