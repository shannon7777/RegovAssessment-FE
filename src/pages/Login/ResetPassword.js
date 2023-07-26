import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axiosApi from "../../lib/axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    retypePassword: "",
  });
  const [verified, setVerified] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) return;
    verifyToken();
  }, []);
  const verifyToken = async () => {
    try {
      const { status } = await axiosApi.put(`users/edit-password`, {
        token,
      });
      if (status !== 200) return setVerified(true);
    } catch (error) {
      //   if (error.response) setError({ text: error.response.data.message });
      if (error.response) console.log(error.response.data.message);
      else {
        // setError({ text: error.message });
        console.log(error.message);
      }
    }
  };

  const resetPassword = async () => {
    try {
      const { status } = await axiosApi.put(`users/edit-password`, {
        password: formData.password,
      });
    } catch (error) {
      //   if (error.response) setError({ text: error.response.data.message });
      if (error.response) console.log(error.response.data.message);
      else {
        // setError({ text: error.message });
        console.log(error.message);
      }
    }
  };
  return (
    <div>
      {verified ? (
        <div>verified , proceed to reset password</div>
      ) : (
        <p>Nothing to see here</p>
      )}
    </div>
  );
};

export default ResetPassword;
