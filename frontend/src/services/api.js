import axios from "axios";

const api = axios.create({
  baseURL: "https://studentnotes.onrender.com",
  withCredentials: true,
});

export default api;
