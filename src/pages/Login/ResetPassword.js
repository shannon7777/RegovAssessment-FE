import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axiosApi from "../../lib/axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { House, LockOpen } from "@mui/icons-material";

const ResetPassword = ({ setNotify, setError }) => {
  const [formData, setFormData] = useState({
    password: "",
    retypePassword: "",
  });
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) return;
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const {
        status,
        data: { email },
      } = await axiosApi.post(`auth/verify-pwd-reset`, {
        token,
      });
      if (status !== 200) return;
      setEmail(email);
      setVerified(true);
    } catch (error) {
      if (error.response)
        setError({ show: true, text: error.response.data.message });
      else {
        setError({ show: true, text: error.message });
      }
    }
  };

  const resetPassword = async () => {
    const { password, retypePassword } = formData;
    if (password !== retypePassword)
      return setError({
        show: true,
        text: `Passwords do not match, please ensure they match`,
      });

    try {
      const {
        status,
        data: { message },
      } = await axiosApi.put(`users/edit-password/${email}`, {
        password: formData.password,
      });
      if (status !== 200) return;
      navigate("/login");
      console.log(message);
      setNotify({ show: true, text: message });
    } catch (error) {
      if (error.response)
        setError({ show: true, text: error.response.data.message });
      else {
        setError({ show: true, text: error.message });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {verified ? (
        <Card
          elevation={4}
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: 3,
            p: 2,
            width: 500,
            background: "#a1a4ab",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Please type in your new password
            </Typography>

            <TextField
              sx={{ my: 2 }}
              required
              id="password"
              type="password"
              name="password"
              label="Password"
              variant="filled"
              onChange={onChange}
              fullWidth
            />

            <TextField
              sx={{ my: 2 }}
              required
              id="retypePassword"
              type="password"
              label="Retype Your Password"
              name="retypePassword"
              variant="filled"
              helperText="Please ensure both passwords match"
              onChange={onChange}
              fullWidth
            />
          </CardContent>

          <CardActions>
            <Button
              sx={{
                bgcolor: "#2a2d64",
                borderRadius: 2,
                mt: 2,
              }}
              onClick={resetPassword}
              variant="contained"
              type="submit"
              endIcon={<LockOpen />}
            >
              Reset
            </Button>

            <Button
              sx={{
                bgcolor: "#3da58a",
                borderRadius: 2,
                mt: 2,
                ml: "auto",
              }}
              to={`/`}
              component={Link}
              variant="contained"
              endIcon={<House />}
            >
              Homepage
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Box p={2} textAlign="center">
          <Typography variant="h3">PAGE NOT FOUND</Typography>
          <Typography
            sx={{ textDecoration: "none", mx: 18 }}
            variant="h5"
            to={"/"}
            component={Link}
          >
            Homepage
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ResetPassword;
