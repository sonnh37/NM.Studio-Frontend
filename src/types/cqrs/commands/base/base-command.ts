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
  id?: string;
  isDeleted?: boolean;
}

// Delete
export interface DeleteCommand extends BaseCommand {
  id: string;
  isPermanent?: boolean;
}
