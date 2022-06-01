import axios from "axios";
import { login, register } from "./authService.js";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const token = currentUser?.token;

function isBearerTokenRequired(url) {
  const parsedUrl = new URL(url);
  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.includes(parsedUrl.pathname)) {
    return false;
  } else {
    return true;
  }
}

axios.interceptors.request.use(
  function (config) {
    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response.data.token) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
    }
    return response;
  },
  function (error) {
    if (
      error?.response?.status === 401 &&
      error.config.url.indexOf("/login") === -1
    ) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { login, register };
