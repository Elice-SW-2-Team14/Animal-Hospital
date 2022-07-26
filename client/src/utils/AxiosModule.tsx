import axios, { AxiosInstance } from "axios";

const { REACT_APP_BASE_URL } = process.env;

export const customAxios: AxiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});
