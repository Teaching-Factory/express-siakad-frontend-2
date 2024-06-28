import { setPermissions, setToken, setUser } from "../../utiils/local_storage";
import { post } from "../../utiils/request";
export const login = async (username, password) => {
    try {
        const body = {
            username: username,
            password: password
        }

        const res = await post('auth/do-login', body, {
            withoutAutorization: true
        });

        if(res.status === 200) {
            const { data } = res;
            setToken(data.token);
            setUser(data.user);
            setPermissions(data.permissions);
        }
        return res;
    } catch (error) {
        throw error;
    }
}