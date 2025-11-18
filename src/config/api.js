export const baseUrl = import.meta.env.VITE_API_URL;

export const baseWsUrl = import.meta.env.VITE_API_URL;

export const apiEndpoints = {
  me: () => `${baseUrl}/auth/me`,

  // Auth
  auth: {
    login: () => `${baseUrl}/auth/login`,
    register: () => `${baseUrl}/auth/register`,
    forgotPassword: () => `${baseUrl}/auth/forgot-password`,
    verifyOTP: () => `${baseUrl}/auth/verify-otp`,
    resetPassword: () => `${baseUrl}/auth/reset-password`,
    logout: () => `${baseUrl}/logout`,
  },

  perform: {
    host: () => `${baseUrl}/performa/host`,
    hostDetail: (id) => `${baseUrl}/performa/host/${id}`,
    studio: () => `${baseUrl}/performa/studio`,
    studioDetail: (id) => `${baseUrl}/performa/studio/${id}`,
    account: () => `${baseUrl}/performa/account`,
  },

  target: {
    getAll: () => `${baseUrl}/target`,
    create: () => `${baseUrl}/target`,
    update: (id) => `${baseUrl}/target/${id}`,
    findById: (id) => `${baseUrl}/target/${id}`,
    delete: (id) => `${baseUrl}/target/${id}`,
  },

  ads: {
    getAll: () => `${baseUrl}/accountads`,
    create: () => `${baseUrl}/accountads`,
    update: (id) => `${baseUrl}/accountads/${id}`,
    findById: (id) => `${baseUrl}/accountads/${id}`,
    delete: (id) => `${baseUrl}/accountads/${id}`,
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
    index: () => `${baseUrl}/account`,
    create: () => `${baseUrl}/account`,
    show: (id) => `${baseUrl}/account/${id}`,
    edit: (id) => `${baseUrl}/account/${id}`,
    delete: (id) => `${baseUrl}/account/${id}`,
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
  transaction: {
    finance: () => `${baseUrl}/finance`,
    products: () => `${baseUrl}/transaction`,
    grouped: () => `${baseUrl}/transaction/grouped`,
  },

  // Live
  live: {
    preview: () => `${baseWsUrl}/live/shopee`,
    detail: (id, sessionId) => `${baseUrl}/live/shopee/${id}/${sessionId}`,
  },

  dashboard: {
    index: () => `${baseUrl}/dashboard`
  }
};
