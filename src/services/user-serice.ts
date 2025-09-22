import { Const } from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  UserCreateCommand,
  UserUpdateCommand,
  UserUpdatePasswordCommand,
} from "@/types/commands/user-command";
import { User } from "@/types/entities/user";
import { BusinessResult } from "@/types/models/business-result";
import { BaseService } from "./base/base-service";
import { UserContextResponse } from "@/types/models/user-context";

class UserService extends BaseService<User> {
  constructor() {
    super(Const.USERS);
  }

  async getUserByContext(): Promise<BusinessResult<UserContextResponse>> {
    const res = await axiosInstance.get<BusinessResult<UserContextResponse>>(
      `${this.endpoint}/context`
    );
    return res.data;
  }

  async create(command: UserCreateCommand): Promise<BusinessResult<User>> {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "User");
    }

    command.avatar = link ?? undefined;

    return await super.create(command);
  }

  async update(command: UserUpdateCommand): Promise<BusinessResult<User>> {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "User");
    }

    if (link && command.avatar) {
      await this.deleteImage(command.avatar);
    }

    command.avatar = link ?? command.avatar;

    return await super.update(command);
  }

  public updatePassword = async (
    command: UserUpdatePasswordCommand
  ): Promise<BusinessResult<null>> => {
    const res = await axiosInstance.put<BusinessResult<null>>(
      `${this.endpoint}/password`,
      command
    );

    return res.data;
  };

  async fetchUserByUsernameOrEmail(
    keyword: string
  ): Promise<BusinessResult<User>> {
    const response = await axiosInstance.get<BusinessResult<User>>(
      `${this.endpoint}/username-or-email`,
      { params: { key: keyword } }
    );
    return response.data;
  }

  async fetchUserByUsername(username: string): Promise<BusinessResult<User>> {
    const response = await axiosInstance.get<BusinessResult<User>>(
      `${this.endpoint}/${username}`
    );
    return response.data;
  }

  async findAccountRegisteredByGoogle(
    token: string
  ): Promise<BusinessResult<null>> {
    const response = await axiosInstance.post<BusinessResult<null>>(
      `${this.endpoint}/find-account-registered-by-google`,
      { token: token }
    );
    return response.data;
  }

  async updateCache(newCache: object): Promise<BusinessResult<null>> {
    const response = await axiosInstance.put<BusinessResult<null>>(
      `${this.endpoint}/update-cache`,
      {
        cache: JSON.stringify(newCache),
      }
    );
    return response.data;
  }
}

export const userService = new UserService();
