export const setToken = (token) => localStorage.setItem('user', JSON.stringify(token));
export const getToken = () => localStorage.getItem('user') ?? null;
export const setUser = (user) => localStorage.setItem('user-data', JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem('user-data') ?? null);
export const setPermissions = (permissions) => localStorage.setItem('permissions', JSON.stringify(permissions ?? []));
export const getPermissions = () => JSON.parse(localStorage.getItem('permissions') ?? []);
