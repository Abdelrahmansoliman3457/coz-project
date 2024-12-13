import axios from "axios";
// import { useAuthStore } from '@/stores/auth';
export const useApi = () => {
  const baseURL = "https://dashboard.qahtani.aait-sa.com/api/";

  if (process.client) {
    axios.defaults.headers.lang = localStorage.getItem("lang") || "ar";
    axios.defaults.headers.secretKey = '9e810ce4d7b9e83d7aaf208b3ecfd0488d6a1e5c67a6a72f384a1d3bcb40c012';
  }
  let token = "";

  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};