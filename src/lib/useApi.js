import { HttpStatusCode } from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

/* ============================================
   Get Authorization Header for Secure Requests
============================================= */
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ============================================
   Core Fetch Handler (dipakai oleh public & secure)
============================================= */
async function coreFetch(URL, { method = "GET", payload = null, headers = {} } = {}) {
  try {
    const options = {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };

    if (payload && method !== "GET") {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(URL, options);

    let json;
    try {
      json = await response.json();
    } catch {
      json = null; // handle empty body or HTML pages
    }

    return {
      ok: response.ok,
      status: response.status,
      data: json,
    };
  } catch (error) {
    console.error("Fetch Error:", error);

    return {
      ok: false,
      status: HttpStatusCode.BadRequest,
      error,
    };
  }
}

/* ============================================
        API PUBLIC (tanpa token)
============================================= */
export const apiPublic = {
  get: (URL) => coreFetch(URL),
  post: (URL, payload) => coreFetch(URL, { method: "POST", payload }),
  put: (URL, payload) => coreFetch(URL, { method: "PUT", payload }),
  delete: (URL) => coreFetch(URL, { method: "DELETE" }),
};

/* ============================================
        API SECURE (dengan token otomatis)
============================================= */
export const apiSecure = {
  get: (URL) =>
    coreFetch(URL, { headers: getAuthHeader() }),

  post: (URL, payload) =>
    coreFetch(URL, { method: "POST", payload, headers: getAuthHeader() }),

  put: (URL, payload) =>
    coreFetch(URL, { method: "PUT", payload, headers: getAuthHeader() }),

  delete: (URL) =>
    coreFetch(URL, { method: "DELETE", headers: getAuthHeader() }),
};
