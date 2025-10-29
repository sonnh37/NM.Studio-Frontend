import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface HomeSlideCreateCommand extends CreateCommand {
  slideId: string;
  displayOrder: number;
  // startDate?: Date | null;
  // endDate?: Date | null;
}

export interface HomeSlideUpdateCommand extends UpdateCommand {
  slideId: string;
  displayOrder: number;
  // startDate?: Date | null;
  // endDate?: Date | null;
}
