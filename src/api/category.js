import axios from "./";

export function searchCategory(cateId = 0) {
  return axios.get("/category/" + cateId);
}

export function addGoods(good) {
  return axios.post("/category", { good });
}

export function updateCategory(good) {
  return axios.post("/category/update", {
    good,
  });
}
