import {Const} from "@/lib/constants/const";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {logout, setUser} from "@/lib/redux/slices/userSlice";
import store from "@/lib/redux/store";
import {BusinessResult} from "@/types/response/business-result";
import {LoginResponse} from "@/types/response/login-response";
import {User} from "@/types/entities/user";
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
        const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
            `${this.endpoint}/login`,
            {account: account, password: password}
        );
        return response.data;
    };

    public logout = async (): Promise<BusinessResult<null>> => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`,
            {},
            {withCredentials: true}
        );
        if (response.data.status === 1) {
            store.dispatch(logout());
        }
        return response.data;
    };

    public loginByGoogle = async (
        token: string
    ): Promise<BusinessResult<LoginResponse>> => {
        const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
            `${this.endpoint}/login-by-google`,
            {token: token}
        );
        return response.data;
    };

    public getUserInfo = async (): Promise<BusinessResult<User>> => {
        const response = await axios.get<BusinessResult<User>>(
            `${process.env.NEXT_PUBLIC_API_BASE}/auth/info`,
            {withCredentials: true}
        );
        return response.data;
    };

    public registerByGoogle = async (
        token: string,
        password: string
    ): Promise<BusinessResult<LoginResponse>> => {
        const response = await axiosInstance.post<BusinessResult<LoginResponse>>(
            `${this.endpoint}/register-by-google`,
            {token: token, password: password}
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
