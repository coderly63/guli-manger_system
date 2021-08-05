import axios from "./index";

export function userLogin(data) {
  return axios.post("/user/login", data);
}

export function userRegister(data) {
  return axios.post("user/register", data);
}
