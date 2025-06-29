import { apiEndpoints } from "@/config/api";
import { getRequest } from "@/lib/useApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
      const response = await axios.get(apiEndpoints.me(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
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

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    isError,
    login,
    logout,
    refetch: () => queryClient.invalidateQueries(["auth", "me"]),
  }));

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
