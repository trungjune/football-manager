import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Xác định base URL cho API
const baseURL =
  typeof window !== "undefined"
    ? process.env.NODE_ENV === "production"
      ? "/api" // Khi deploy, API sẽ có cùng domain
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Tạo instance axios
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Xử lý lỗi 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      // Xóa token và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
