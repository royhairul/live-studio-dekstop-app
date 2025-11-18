import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";

export const createSchedule = async (payload) => {
  try {
    const { status, result, error } = apiSecure.post(
      apiEndpoints.schedule.create(),
      payload
    );
  } catch (error) {}
};

export const deleteSchedule = () => {};
