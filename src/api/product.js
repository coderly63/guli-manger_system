import axios from "./";

export function uploadFiles(files) {
  return axios.post("/product/upload", files);
}

export function searchProduct(key = 0, offset = 0, limit = 3) {
  return axios.get("/product", {
    params: {
      key,
      offset,
      limit,
    },
  });
}

export function getCategory(categoryId) {
  return axios.get("/product/category", {
    params: {
      categoryId,
    },
  });
}
