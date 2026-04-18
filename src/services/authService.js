import axios from "./axios";

export const login = (data) => axios.post('/auth/login', data);
export const register = (data) => axios.post('/auth/register', data);
export const recoverAccount = (data) => axios.post('/auth/recover', data);

