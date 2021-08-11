import axios from "axios";
import { message } from "antd";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
  headers: {
    "conten-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  config.headers.Authorization = token ? "Bearer " + token : null;
  return config;
});

instance.interceptors.response.use((response) => {
  const { status, msg } = response.data;
  if (status === 400) message.warn(msg);
  else if (status === 401) {
    message.warning(msg);
    window.location.href = "http://localhost:3000/login";
  }
  return response.data;
});

export default instance;
