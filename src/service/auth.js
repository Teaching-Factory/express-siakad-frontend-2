export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token') ?? null;
export const setUser = (user) => localStorage.setItem('user-data', JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem('user-data') ?? null);
export const setPermissions = (permissions) => localStorage.setItem('permissions', JSON.stringify(permissions ?? []));
export const getPermissions = () => JSON.parse(localStorage.getItem('permissions') ?? []);
export const clearToken = () => localStorage.removeItem('token');
export const clearUser = () => localStorage.removeItem('user-data');
export const clearPermissions = () => localStorage.removeItem('permissions');
