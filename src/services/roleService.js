import { apiEndpoints } from "@/config/api";
import { postRequest } from "@/lib/useApi";

export const createRole = async (payload) => {
  const { status, result, errors } = await postRequest(
    apiEndpoints.role.create(),
    payload
  );

  if (status) {
    throw new Error(errors || "Error Network: Failed to create role");
  }

  return result;
};

export const getRoleById = async (id) => {};
