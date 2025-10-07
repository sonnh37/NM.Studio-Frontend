import { CreateCommand } from "./base/base-command";
import {UpdateCommand} from "@/types/cqrs/commands/base/base-command";


export interface ImageCreateCommand extends CreateCommand {
  description?: string;
  mediaBaseId?: string;
  mediaUrlId?: string;
}

export interface ImageUpdateCommand extends UpdateCommand {
  description?: string;
  mediaBaseId?: string;
  mediaUrlId?: string;
}
