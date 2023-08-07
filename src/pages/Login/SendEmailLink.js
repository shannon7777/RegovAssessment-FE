import { useState } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../../lib/axios";

import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Lock, LockOpen, Login } from "@mui/icons-material";

const SendEmailLink = ({ setError, setNotify, setInfo }) => {
  const [email, setEmail] = useState("");

  const onSubmitEmail = async () => {
    if (!email)
      return setError({ show: true, text: `Please type in your email` });
    try {
      const {
        status,
        data: { message },
      } = await axiosApi.post("/auth/reset", { email });
      if (status !== 200) return;
      setInfo({ show: true, text: message });
      console.log(status, message);
    } catch (error) {
      if (error.response)
        setError({ show: true, text: error.response.data.message });
      else {
        setError({ show: true, text: error.message });
      }
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 2,
        width: 500,
        background: "#e99592",
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Lock />
        <Typography variant="h5" fontWeight="bold">
          Forgot your password ?
        </Typography>
        <Typography variant="h7">
          Enter your email and we'll send you a link so you can reset your
          password
        </Typography>

        <TextField
          required
          id="email"
          name="email"
          label="Email"
          variant="standard"
          helperText="Make sure this email belongs to you"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </CardContent>

      <CardActions sx={{ display: "block" }}>
        <Button
          sx={{
            bgcolor: "#2a2d64",
            borderRadius: 2,
            mt: 1,
          }}
          onClick={onSubmitEmail}
          variant="contained"
          type="submit"
          endIcon={<LockOpen />}
          fullWidth
        >
          Send Password Recovery Link
        </Button>

        <Button
          sx={{
            bgcolor: "#3da58a",
            borderRadius: 2,
            mt: 2,
          }}
          to={`/login`}
          component={Link}
          variant="contained"
          endIcon={<Login />}
          fullWidth
        >
          Back to Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default SendEmailLink;
