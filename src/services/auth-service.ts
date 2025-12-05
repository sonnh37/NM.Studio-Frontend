import { Constants } from "@/lib/constants/constants";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { logout, setUser } from "@/lib/redux/slices/userSlice";
import store from "@/lib/redux/store";
import { BusinessResult, Status } from "@/types/models/business-result";
import { LoginResponse } from "@/types/models/login-response";
import { User } from "@/types/entities/user";
import axios from "axios";
import { userContextHelper } from "@/lib/utils/user-context-helper";
import { tokenHelper } from "@/lib/utils/token-helper";

class AuthService {
  public endpoint: string;

  constructor() {
    this.endpoint = Constants.AUTH;
  }

  public login = async (
    account: string,
    password: string
  ): Promise<BusinessResult<LoginResponse>> => {
    const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
      `${this.endpoint}/login`,
      { account: account, password: password }
    );
    return response.data;
  };

  public logout = async (): Promise<BusinessResult<void>> => {
    const refreshToken = tokenHelper.getRefreshToken();
    const response = await axiosInstance.post<BusinessResult<void>>(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/logout`,
      { refreshToken }
    );

    // if (response.data.status === Status.OK) {
    userContextHelper.clear();
    tokenHelper.clear();
    // }

    return response.data;
  };

  public loginByGoogle = async (
    token: string
  ): Promise<BusinessResult<LoginResponse>> => {
    const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
      `${this.endpoint}/login-by-google`,
      { token: token }
    );
    return response.data;
  };

  public registerByGoogle = async (
    token: string,
    password: string
  ): Promise<BusinessResult<LoginResponse>> => {
    const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
      `${this.endpoint}/register-by-google`,
      { token: token, password: password }
    );
    return response.data;
  };

  public register = async (
    auth: User
  ): Promise<BusinessResult<LoginResponse>> => {
    const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
      `${this.endpoint}/register`,
      auth
    );
    return response.data;
  };
}

export const authService = new AuthService();
