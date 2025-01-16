import { Const } from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  UserCreateCommand,
  UserUpdateCommand,
  UserUpdatePasswordCommand,
} from "@/types/commands/user-command";
import { BusinessResult } from "@/types/response/business-result";
import { User } from "@/types/user";
import { BaseService } from "./base-service";

class UserService extends BaseService<User> {
  constructor() {
    super(Const.USER);
  }

  public create = async (
    command: UserCreateCommand
  ): Promise<BusinessResult<User>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "User");
    }

    command.avatar = link ?? undefined;

    return axiosInstance
      .post<BusinessResult<User>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public update = async (
    command: UserUpdateCommand
  ): Promise<BusinessResult<User>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "User");
    }

    if (link && command.avatar) {
      await this.deleteImage(command.avatar);
    }

    command.avatar = link ?? command.avatar;

    return axiosInstance
      .put<BusinessResult<User>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public updatePassword = async (
    command: UserUpdatePasswordCommand
  ): Promise<BusinessResult<null>> => {
    return axiosInstance
      .put<BusinessResult<null>>(`${this.endpoint}/password`, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public fetchUserByUsernameOrEmail = async (
    keyword: string
  ): Promise<BusinessResult<User>> => {
    try {
      const response = await axiosInstance.get<BusinessResult<User>>(
        `${this.endpoint}/username-or-email`,
        { params: { key: keyword } }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };

  public fetchUserByUsername = async (
    username: string
  ): Promise<BusinessResult<User>> => {
    try {
      const response = await axiosInstance.get<BusinessResult<User>>(
        `${this.endpoint}/${username}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };

  public findAccountRegisteredByGoogle = async (
    token: string
  ): Promise<BusinessResult<null>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<null>>(
        `${this.endpoint}/find-account-registered-by-google`,
        { token: token }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };
}

export const userService = new UserService();
