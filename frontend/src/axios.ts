import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

const setToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token;
};
const removeToken = () => {
  axiosInstance.defaults.headers.common.Authorization = undefined;
};

export { axiosInstance, setToken, removeToken };
