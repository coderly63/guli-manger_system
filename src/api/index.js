import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  config.headers.Authorization = token ? "Bearer " + token : null;
  return config;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
