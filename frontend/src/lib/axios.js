import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  //to znaczy zeby wysylac cookies za kazydm request
  withCredentials: true,
});
