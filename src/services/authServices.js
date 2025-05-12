import axios from "api/aixos";

const login = async (loginData) => {
    return await axios.post('/api/users/auth', loginData);
}

const logout = () => {
    sessionStorage.clear();
}

export default {
    login,
    logout
}