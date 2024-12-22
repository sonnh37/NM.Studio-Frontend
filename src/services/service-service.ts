import { Service } from "@/types/service";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { BusinessResult } from "@/types/response/business-result";
import {
  ServiceCreateCommand,
  ServiceUpdateCommand,
} from "@/types/commands/service-command";
import axiosInstance from "@/lib/axios-instance";

class ServiceService extends BaseService<Service> {
  constructor() {
    super(`${Const.SERVICE}`);
  }
  public create = async (
    command: ServiceCreateCommand
  ): Promise<BusinessResult<Service>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Service");
    }

    command.src = link ?? undefined;

    return axiosInstance
      .post<BusinessResult<Service>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public update = async (
    command: ServiceUpdateCommand
  ): Promise<BusinessResult<Service>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Service");
    }

    if (link && command.src) {
      await this.deleteImage(command.src);
    }

    command.src = link ?? command.src;

    return axiosInstance
      .put<BusinessResult<Service>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public deletePermanent = async (
    id: string
  ): Promise<BusinessResult<null>> => {
    try {
      const data = await this.fetchById(id);
      const filePath = data.data?.src;

      // Gọi API xóa trên backend
      const response = await axiosInstance
        .delete<BusinessResult<null>>(
          `${this.endpoint}?id=${id}&isPermanent=true`
        )
        .then((res) => res.data);

      // Nếu backend xóa thành công và có filePath, xóa file trên Firebase
      if (response.status === 1 && filePath) {
        await this.deleteImage(filePath);
      }

      return response;
    } catch (error) {
      return this.handleError(error); // Xử lý lỗi
    }
  };
}

export const serviceService = new ServiceService();
