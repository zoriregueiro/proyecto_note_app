import axios from "axios";

export function login(email, password) {
  return axios.post("http://localhost:8000/api/login", {
    email,
    password,
  });
}

export function register(name, email, password) {
  return axios.post("http://localhost:8000/api/account", {
    name,
    email,
    password,
  });
}


