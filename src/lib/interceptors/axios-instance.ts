import { BusinessResult, Status } from "@/types/models/business-result";
import { RefreshTokenResult } from "@/types/models/token-result";
import axios from "axios";
import { tokenHelper } from "../utils/token-helper";
import { userContextHelper } from "../utils/user-context-helper";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE + "/api",
  withCredentials: true,
  timeout: 60000,
});

axiosInstance.interceptors.request.use((config) => {
  const session = localStorage.getItem("current_session");
  if (session) {
    const tokenResult = JSON.parse(session);
    if (tokenResult?.accessToken) {
      config.headers.Authorization = `Bearer ${tokenResult.accessToken}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu nhận lỗi 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token để lấy accessToken mới
        const res: BusinessResult<RefreshTokenResult> = (
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/refresh-token`,
            tokenHelper.get(),
            { withCredentials: true }
          )
        ).data as BusinessResult<RefreshTokenResult>;

        if (res.status != Status.OK) {
          // if (window.location.pathname.startsWith("/dashboard")) {
          //   window.location.href = "/login";
          // }
          tokenHelper.clear();
          userContextHelper.clear();
          window.location.href = "/login";

          return Promise.reject(error);
        }

        const newTokenResult = res.data;
        if (!newTokenResult) {
          return Promise.reject("No token result");
        }

        tokenHelper.save(newTokenResult);
        userContextHelper.save(newTokenResult.user);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Not access permission
    if (error.response?.status === 403) {
      window.location.href = "/error/403";
      return Promise.reject(error); // Ngăn không gửi lại yêu cầu
    }

    const br = error.response?.data as BusinessResult<any>;
    if (br && br.status === Status.ERROR) {
      return Promise.resolve(br);
    }

    return Promise.resolve({
      data: {
        status: Status.ERROR,
        error: { detail: "Hệ thống có lỗi, vui lòng thử lại sau." },
      },
    });
  }
);

export default axiosInstance;
