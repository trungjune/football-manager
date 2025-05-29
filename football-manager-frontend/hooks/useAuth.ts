import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Khởi tạo trạng thái người dùng từ localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Đăng nhập
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng ký
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setLoading(true);
      try {
        const response = await authService.register({ name, email, password });
        setUser(response.user);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Đăng xuất
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Kiểm tra xác thực
  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
