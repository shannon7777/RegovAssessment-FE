import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import useAuth from "../../hooks/useAuth";
import axiosApi from "../../lib/axios";

const Login = ({ setNotify, setError }) => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError({ show: true, text: `Please fill both email and password fields!` });
      return;
    }
    try {
      const {
        data: { user, accessToken, message },
      } = await axiosApi.post("auth", formData);
      setAuth({ user, accessToken });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      navigate(from, { replace: true });
      setFormData({ email: "", password: "" });
      setNotify({ show: true, text: message });
    } catch (error) {
      if (error.response) setError({show: true, text: error.response.data.message });
      else {
        setError({show: true, text: error.message });
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} onChange={onChange} />;
};

export default Login;
