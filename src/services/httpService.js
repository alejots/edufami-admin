import axios from "axios";
import Toastify from "toastify-js";
import logger from "./logService";

axios.defaults.baseURL = "http://localhost:3030/api";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    Toastify({
      text:
        "An unexpected error has occurred! Please verify your internet connection!",
      duration: 10000,
      close: true,
      gravity: "top",
      positionLeft: false,
      backgroundColor: "linear-gradient(to right, #FF0010, #ff0000)"
    }).showToast();
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt
};
