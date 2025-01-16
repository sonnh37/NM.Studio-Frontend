import { Const } from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { logout, setUser } from "@/lib/redux/slices/userSlice";
import store from "@/lib/redux/store";
import { BusinessResult } from "@/types/response/business-result";
import { LoginResponse } from "@/types/response/login-response";
import { User } from "@/types/user";
import axios from "axios";

class AuthService {
  public endpoint: string;

  constructor() {
    this.endpoint = Const.AUTH;
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.status === 1) {
        store.dispatch(logout());
      }
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

  public getUserInfo = async (): Promise<BusinessResult<User>> => {
    try {
      const response = await axios.get<BusinessResult<User>>(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/info`,
        { withCredentials: true }
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
    auth: User
  ): Promise<BusinessResult<LoginResponse>> => {
    try {
      const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
        `${this.endpoint}/register`,
        auth
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  };

  protected handleError(error: any) {
    console.error(`${this.endpoint} API Error:`, error);
    return Promise.reject(error);
  }
}

export const authService = new AuthService();
