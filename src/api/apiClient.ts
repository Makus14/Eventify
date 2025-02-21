import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://catalog.api.2gis.com/3.0/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
