import axios from "axios";

const accessToken = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;

const axiosApi = axios.create({
  baseURL: `http://localhost:7000/api`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
// axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// axiosApi.interceptors.request.use((config) => {
//   const accessToken = JSON.parse(localStorage.getItem("accessToken"));
//   if (accessToken)
//     return (config.headers.Authorization = `Bearer ${accessToken}`);
// });
export default axiosApi;
