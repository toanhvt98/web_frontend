import axios from "axios";
import { API_URL } from "./config";

const service = axios.create({
  baseURL: API_URL,
});

service.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
export default service;
