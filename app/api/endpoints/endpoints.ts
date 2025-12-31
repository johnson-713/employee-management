// Auth Endpoints
export const authEndpoints = {
  login: `/auth/login`,
  profile: `/auth/me`,
};

// Employees Endpoints
export const employeesEndpoints = {
  list: `/users`,
  detail: (id: string) => `/users/${id}`,
};
