import { apiEndpoints } from "@/config/api";
import { postRequest } from "@/lib/useApi";

export const createSchedule = async (payload) => {
  try {
    const { status, result, error } = postRequest(
      apiEndpoints.schedule.create(),
      payload
    );
  } catch (error) {}
};

export const deleteSchedule = () => {};
