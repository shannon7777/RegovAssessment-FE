import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../lib/axios";

import RegisterForm from "./RegisterForm";

const Register = ({ setError, setNotify, setInfo }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRetype: "",
  });

  const navigate = useNavigate();

  const { email, firstName, lastName, password, passwordRetype } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("register button");
    try {
      if (!email || !firstName || !lastName || !password || !passwordRetype) {
        setInfo({ text: "Please fill in all the fields" });
        return;
      }

      if (password !== passwordRetype) {
        setError({
          text: "Please make sure both password fields match!",
        });
        return;
      }

      const {
        data: { message },
      } = await axiosApi.post(`users`, formData);
      navigate("/login");
      setNotify({ text: message });
    } catch (error) {
      // if (error.response) setError({ text: error.response.data.message });
      // else {
      //   setError({ text: error.message });
      // }
      console.log(error);
    }
  };

  return <RegisterForm onChange={onChange} onSubmit={onSubmit} />;
};

export default Register;
