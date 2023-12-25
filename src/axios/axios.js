import axios from "axios";

const baseAPI = "";

export const authorizedAxios = (token) => axios.create({
  baseURL: baseAPI,
  headers: {
    Authorization: token
  }
});

export const unauthorizedAxios = axios.create({
  baseURL: baseAPI
});
