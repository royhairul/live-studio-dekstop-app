import index from "@event-calendar/time-grid";

export const baseUrl = "http://localhost:8080/api";
export const baseWsUrl = "http://localhost:8080/api";

export const apiEndpoints = {
  me: () => `${baseUrl}/me`,

  // Auth
  auth: {
    login: () => `${baseUrl}/login`,
    register: () => `${baseUrl}/register`,
    forgotPassword: () => `${baseUrl}/forgot-password`,
    verifyOTP: () => `${baseUrl}/verify-otp`,
    resetPassword: () => `${baseUrl}/reset-password`, // lowercase konsisten
  },

  // User
  user: {
    index: () => `${baseUrl}/user`,
    create: () => `${baseUrl}/user`,
    show: (id) => `${baseUrl}/user/${id}`,
    edit: (id) => `${baseUrl}/user/${id}`,
    delete: (id) => `${baseUrl}/user/${id}`,
  },

  // Superadmin
  superadmin: {
    index: () => `${baseUrl}/superadmin/user`,
    create: () => `${baseUrl}/superadmin/user`,
    show: (id) => `${baseUrl}/superadmin/user/${id}`,
    edit: (id) => `${baseUrl}/superadmin/user/${id}`,
    delete: (id) => `${baseUrl}/superadmin/user/${id}`,
  },

  // Host
  host: {
    index: () => `${baseUrl}/host`,
    create: () => `${baseUrl}/host`,
    show: (id) => `${baseUrl}/host/${id}`,
    edit: (id) => `${baseUrl}/host/${id}`,
    delete: (id) => `${baseUrl}/host/${id}`,
    groupedByStudio: () => `${baseUrl}/host/group-by-studio`,
  },

  // Account
  account: {
    index: () => `${baseUrl}/account/shopee`,
    create: () => `${baseUrl}/account/shopee`,
    show: (id) => `${baseUrl}/account/${id}`,
    edit: (id) => `${baseUrl}/account/${id}`,
    delete: (id) => `${baseUrl}/account/shopee/${id}`,
  },

  // Schedule
  schedule: {
    index: () => `${baseUrl}/schedule`,
    create: () => `${baseUrl}/schedule`,
    show: (id) => `${baseUrl}/schedule/${id}`,
    edit: (id) => `${baseUrl}/schedule/${id}`,
    delete: (id) => `${baseUrl}/schedule/${id}`,
    switch: () => `${baseUrl}/schedule/switch`,
    scheduled: (date, shift_id) =>
      `${baseUrl}/schedule/scheduled?date=${date}&shift_id=${shift_id}`,
  },

  // Schedule
  shift: {
    index: () => `${baseUrl}/shift`,
    create: () => `${baseUrl}/shift`,
    show: (id) => `${baseUrl}/shift/${id}`,
    edit: (id) => `${baseUrl}/shift/${id}`,
    delete: (id) => `${baseUrl}/shift/${id}`,
  },

  attendance: {
    index: () => `${baseUrl}/attendance`,
    uncheckedOut: () => `${baseUrl}/attendance/unchecked-out`,
    checkIn: () => `${baseUrl}/attendance/check-in`,
    checkOut: () => `${baseUrl}/attendance/check-out`,
  },

  // Studio
  studio: {
    index: () => `${baseUrl}/studio`,
    create: () => `${baseUrl}/studio`,
    show: (id) => `${baseUrl}/studio/${id}`,
    edit: (id) => `${baseUrl}/studio/${id}`,
    delete: (id) => `${baseUrl}/studio/${id}`,
  },

  // Role
  role: {
    index: () => `${baseUrl}/role`,
    create: () => `${baseUrl}/role`,
    show: (id) => `${baseUrl}/role/${id}`,
    edit: (id) => `${baseUrl}/role/${id}`,
    delete: (id) => `${baseUrl}/role/${id}`,
  },

  // Permission
  permission: {
    index: () => `${baseUrl}/permission`,
    grouped: () => `${baseUrl}/permission/grouped`,
  },

  // Finance
  finance: {
    daily: () => `${baseUrl}/finance/shopee`,
    commission: () => `${baseUrl}/finance/shopee/commission`,
  },

  // Live
  live: {
    preview: () => `${baseWsUrl}/live/shopee`,
  },
};
