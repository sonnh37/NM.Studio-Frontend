import { User } from "@/types/user";
import { BusinessResult } from "@/types/response/business-result";
import { LoginResponse } from "@/types/response/login-response";
import { Const } from "@/lib/const";
import axiosInstance from "@/lib/axios-instance";
import { BaseService } from "./base-service";
import axios from "axios";

class UserService extends BaseService<User> {
  constructor() {
    super(Const.USER);
  }

  public login = async (
    account: string,
    password: string
  ): Promise<BusinessResult<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
        `${this.endpoint}/login`,
        { account: account, password: password }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  public logout = async (): Promise<BusinessResult<null>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<null>>(
        `${this.endpoint}/logout`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  public loginByGoogle = async (
    token: string
  ): Promise<BusinessResult<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
        `${this.endpoint}/login-by-google`,
        { token: token }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
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

  public getCurrentUser = async (): Promise<BusinessResult<User>> => {
    try {
      const response = await axiosInstance.get<BusinessResult<User>>(
        `${this.endpoint}/info`
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

  public registerByGoogle = async (
    token: string,
    password: string
  ): Promise<BusinessResult<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
        `${this.endpoint}/register-by-google`,
        { token: token, password: password }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };

  public register = async (
    user: User
  ): Promise<BusinessResult<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
        `${this.endpoint}/register`,
        user
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };

  public refreshToken = (
    command: string
  ): Promise<BusinessResult<LoginResponse>> => {
    return axiosInstance
      .post<BusinessResult<LoginResponse>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public checkAccess = (): Promise<BusinessResult<null>> => {
    return axios
      .get<BusinessResult<null>>(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/check-access`,
        { withCredentials: true }
      )
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };
}

export default new UserService();
