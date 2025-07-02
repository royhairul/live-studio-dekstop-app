import { apiEndpoints } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getHosts } from "../services/hostService";

export const useHosts = () => {
  return useQuery({
    queryKey: ["hosts"],
    queryFn: () => getHosts(),
    initialData: [],
  });
};
