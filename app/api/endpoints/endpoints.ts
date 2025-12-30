// Auth Endpoints
export const authEndpoints = {
  login: `/auth/login`,
};

// Employees Endpoints
export const employeesEndpoints = {
  list: `/users`,
  detail: (id: string) => `/users/${id}`,
};
