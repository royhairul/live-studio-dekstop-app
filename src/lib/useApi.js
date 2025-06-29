import { HttpStatusCode } from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function apiRequest(
  URL,
  { method = "GET", payload = null, headers = {}, auth = false } = {}
) {
  try {
    const options = {
      method,
      headers: {
        ...defaultHeaders,
        ...(auth ? getAuthHeader() : {}),
        ...headers,
      },
    };

    if (payload && method !== "GET") {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(URL, options);
    const json = await response.json();

    return {
      status: response.ok,
      result: json,
    };
  } catch (error) {
    console.error("Fetch API Error: ", error);
    return {
      status: HttpStatusCode.BadRequest,
      errors: error,
    };
  }
}

export const getRequest = (URL, options = {}) =>
  apiRequest(URL, { ...options, method: "GET" });

export const postRequest = (URL, payload, options = {}) =>
  apiRequest(URL, { ...options, method: "POST", payload });

export const putRequest = (URL, payload, options = {}) =>
  apiRequest(URL, { ...options, method: "PUT", payload });

export const deleteRequest = (URL, options = {}) =>
  apiRequest(URL, { ...options, method: "DELETE" });
