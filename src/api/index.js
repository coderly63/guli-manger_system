import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization =
    window.localStorage.getItem("Authorization") || null;
  return config;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
