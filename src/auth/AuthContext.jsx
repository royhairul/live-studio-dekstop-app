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

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token")
  );  

  const fetchUser = useCallback(async () => {
    if (!token) return null;

    try {
      const response = await apiSecure.get(apiEndpoints.me());
      
      return response.data.data;
      
    } catch (error) {
      console.log(error);
      
      if (error.response?.status === 401) {
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

  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    queryClient.invalidateQueries(["auth", "me"]);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    queryClient.removeQueries(["auth", "me"]);
  };

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


  const contextValue = useMemo(() => ({
    user,
    isLoading,
    isError,
    login,
    logout,
    rememberMe,
    clearRememberMe,
    getRemembered,
    refetch: () => queryClient.invalidateQueries(["auth", "me"]),
  }));

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
