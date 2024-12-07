export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token') ?? null;
export const setUser = (user) => localStorage.setItem('user-data', JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem('user-data') ?? null);
export const setPermissions = (permissions) => localStorage.setItem('permissions', JSON.stringify(permissions ?? []));
export const getPermissions = () => JSON.parse(localStorage.getItem('permissions') ?? []);
export const setSettingGlobal = (setting_global_prodi) => localStorage.setItem('setting_global_prodi', JSON.stringify(setting_global_prodi ?? []));
export const getSettingGlobal = () => JSON.parse(localStorage.getItem('setting_global_prodi') ?? []);
export const clearSettingGlobal = () => localStorage.removeItem('setting_global_prodi');
