// src/config/routes.js
export const appRoutes = {
  login: "/login",
  dashboard: "/dashboard",
  host: {
    all: "/host/all",
    create: "/host/create",
    detail: (id = ":id") => `/host/${id}/detail`,
  },
  // dst...
};
