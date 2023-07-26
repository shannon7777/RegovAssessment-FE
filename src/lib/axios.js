import axios from "axios";

// const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const axiosApi = axios.create({
  baseURL: `http://localhost:7000/api`,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
  // withCredentials: true,
});

export default axiosApi;
