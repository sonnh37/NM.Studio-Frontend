import { BusinessResult } from "@/types/response/business-result";
import { LoginResponse } from "@/types/response/login-response";
import axios from "axios";
import store from "./store";
import { fetchToken, setToken } from "./slices/tokenSlice";
import userSerice from "@/services/user-serice";
import { logout, setUser } from "./slices/userSlice";
import { User } from "@/types/user";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  //timeout: 10000,
});

// Thêm một interceptor để set header Authorization cho mọi yêu cầu
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// Not yet
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu nhận lỗi 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token để lấy accessToken mới
        const refreshResponse = (
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE}/users/refresh-token`,
            {},
            { withCredentials: true }
          )
        ).data as BusinessResult<LoginResponse>;

        if (refreshResponse.status !== 1) {
          // Nếu refresh token đã hết hạn tự đăng xuất ra ở frontend tránh còn lưu cache
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_BASE}/users/logout`,
              {},
              { withCredentials: true }
            )
            .then((res) => {
              window.location.href = "/login";
              return Promise.reject(error);
            });
        }

        return axiosInstance(originalRequest); // Gửi lại yêu cầu ban đầu với token mới
      } catch (refreshError) {
        // Nếu refresh thất bại, người dùng có thể cần đăng nhập lại
        console.error("Refresh token failed:", refreshError);
        // store.dispatch(setToken(null));
      }
    }

    // Not access permission
    if (error.response?.status === 403) {
      window.location.href = "/error/403";
      return Promise.reject(error); // Ngăn không gửi lại yêu cầu
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
