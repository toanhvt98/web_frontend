import axios from "axios";
import { API_URL } from "./config";

const service = axios.create({
  baseURL: API_URL,
});

service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (request) {
    return request;
  },
  function (response) {
    return response;
  },
  function (error) {
    return error;
  }
);
export default service;
