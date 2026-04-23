import axios from "axios";
//VITE_APP_BASE_URL=https://rickandmortyapi.com
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL:BASE_URL,
  headers:{
    'Content-Type': 'application/json'
  }
})