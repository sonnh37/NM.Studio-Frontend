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
  public async save(
    command: CreateOrUpdateCommand
  ): Promise<BusinessResult<Service>> {
    if (command instanceof ServiceUpdateCommand) {
      await this.handleMediaUploads(command);
      return await super.update(command);
    } else if (command instanceof ServiceCreateCommand) {
      await this.handleMediaUploads(command);
      return await super.create(command);
    }

    throw new Error("Unsupported command type");
  }

  private async handleMediaUploads(
    command: ServiceCreateCommand | ServiceUpdateCommand
  ) {
    if (command.thumbnailFile) {
      const uploadResult = await mediaUploadService.uploadFile(
        command.thumbnailFile,
        "Service"
      );
      command.srcThumbnail = uploadResult?.secureUrl ?? null;
    }
  }
}

export const serviceService = new ServiceService();
