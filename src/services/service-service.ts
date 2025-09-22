import { Const } from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  ServiceCreateCommand,
  ServiceDeleteCommand,
  ServiceUpdateCommand,
} from "@/types/commands/service-command";
import { Service } from "@/types/entities/service";
import { BusinessResult } from "@/types/models/business-result";
import { BaseService } from "./base/base-service";

class ServiceService extends BaseService<Service> {
  constructor() {
    super(`${Const.SERVICES}`);
  }
  async create(
    command: ServiceCreateCommand
  ): Promise<BusinessResult<Service>> {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Service");
    }

    command.src = link ?? undefined;

    return await super.create(command);
  }

  async update(
    command: ServiceUpdateCommand
  ): Promise<BusinessResult<Service>> {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Service");
    }

    if (link && command.src) {
      await this.deleteImage(command.src);
    }

    command.src = link ?? command.src;

    const res = await axiosInstance.put<BusinessResult<Service>>(
      this.endpoint,
      command
    );
    return res.data;
  }

  async deletePermanently(
    command: ServiceDeleteCommand
  ): Promise<BusinessResult<null>> {
    const data = await this.getById(command.id);
    const filePath = data.data?.src;

    const response = await super.delete(command);
    if (response.status === 1 && filePath) {
      await this.deleteImage(filePath);
    }

    return response;
  }
}

export const serviceService = new ServiceService();
