import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    console.log("LOGIN RESPONSE:", response);  // Log the full response
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);

    return response;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};

export const register = async ({ username, password, firstName, lastName, email, roles }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, password, firstName, lastName, email, roles });
    const user = response.data;
    console.log("USERRR: ", user);
    return user;
};

export const getProfileByUsername = async (username) => {
    const response = await api.get(`${USERS_URL}/${username}`);
    return response;
};