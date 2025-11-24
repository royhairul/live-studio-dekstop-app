import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token")
  );

  /** ============================================
   *  FETCH USER PROFILE
   *  - Tidak boleh return undefined
   *  - Error dari coreFetch = {status, message, data}
   * ============================================ */
  const fetchUser = useCallback(async () => {
    if (!token) return null; // wajib return nilai

    try {
      const response = await apiSecure.get(apiEndpoints.me());
      return response.data.data || null; // wajib return object/null, bukan undefined
    } catch (error) {
      console.error("Fetch /me error:", error);

      // coreFetch tidak punya error.response
      if (error.status === 401) {
        logout();
      }
      throw error;
    }
  }, [token]);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchUser,
    enabled: !!token,
    retry: false,
  });

  /** ============================================
   *  LOGIN
   * ============================================ */
  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    queryClient.invalidateQueries(["auth", "me"]);
  };

  /** ============================================
   *  LOGOUT
   * ============================================ */
  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    queryClient.removeQueries(["auth", "me"]);
  };

  /** ============================================
   *  REMEMBER ME
   * ============================================ */
  const rememberMe = (email, password) => {
    Cookies.set("email", email, { expires: 7 });
    Cookies.set("password", password, { expires: 7 });
  };

  const clearRememberMe = () => {
    Cookies.remove("email");
    Cookies.remove("password");
  };

  const getRemembered = () => ({
    email: Cookies.get("email") || "",
    password: Cookies.get("password") || "",
    rememberMe: !!Cookies.get("email"),
  });

  /** ============================================
   *  CONTEXT VALUE — pakai dependency array
   *  agar tidak error Fast Refresh
   * ============================================ */
  const contextValue = useMemo(
    () => ({
      user: user || null,
      isLoading,
      isError,
      login,
      logout,
      rememberMe,
      clearRememberMe,
      getRemembered,
      refetch: () => queryClient.invalidateQueries(["auth", "me"]),
      token,
      isAuthenticated: !!token,
    }),
    [
      user,
      isLoading,
      isError,
      token,
      login,
      logout,
      rememberMe,
      clearRememberMe,
      getRemembered,
      queryClient,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
