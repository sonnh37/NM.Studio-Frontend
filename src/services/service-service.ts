import { Const } from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  ServiceCreateCommand,
  ServiceDeleteCommand,
  ServiceUpdateCommand,
} from "@/types/cqrs/commands/service-command";
import { Service } from "@/types/entities/service";
import { BusinessResult, Status } from "@/types/models/business-result";
import { BaseService } from "./base/base-service";
import { CreateOrUpdateCommand } from "@/types/cqrs/commands/base/base-command";
import { mediaUploadService } from "./media-upload-service";

class ServiceService extends BaseService<Service> {
  constructor() {
    super(`${Const.SERVICES}`);
  }
}

export const serviceService = new ServiceService();
