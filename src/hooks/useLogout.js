import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axiosApi from "../lib/axios";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    console.log("logout");
    try {
      await axiosApi(`auth/logout`);
      setAuth({});
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return logout;
};

export default useLogout;
