import { apiEndpoints } from "@/config/api";
import { apiSecure } from "@/lib/useApi";

export async function getHosts() {
  const res = await apiSecure.get(apiEndpoints.host.index());
  return res.data.data;
}

export async function getHostById(id) {
  return apiSecure.get(apiEndpoints.host.show(id));
}

export async function createHost(payload) {
  return apiSecure.post(apiEndpoints.host.create(), payload);
}

export async function deleteHost(id) {
  return apiSecure.delete(apiEndpoints.host.delete(id));
}
