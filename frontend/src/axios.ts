import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
});

const setToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token;
};
const removeToken = () => {
  axiosInstance.defaults.headers.common.Authorization = undefined;
};

export { axiosInstance, setToken, removeToken };
