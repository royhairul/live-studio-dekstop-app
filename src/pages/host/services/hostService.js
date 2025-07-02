import { apiEndpoints } from "@/config/api";
import axios from "axios";

export async function getHosts() {
  return axios
    .get(apiEndpoints.host.index())
    .then((response) => response.data.data);
}

export async function getHostById(id) {
  return axios.get(apiEndpoints.host.show(id));
}

export async function createHost(payload) {
  return axios.post(apiEndpoints.host.create(), payload);
}

export async function deleteHost(id) {
  return axios.delete(apiEndpoints.host.delete(id));
}
