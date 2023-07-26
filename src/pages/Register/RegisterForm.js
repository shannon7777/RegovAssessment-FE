import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { HowToReg, Login } from "@mui/icons-material";

const RegisterForm = ({ onChange, onSubmit }) => {
  return (
    <>
      <Card
        elevation={4}
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          width: 700,
          background: "#70d8bd",
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ alignItems: "center" }}>
          <Typography color="#1F2A40" variant="h3" fontWeight="bold" mb={2}>
            Create Your Account
          </Typography>
          <Stack gap={2}>
            <Box gap={7} display="flex" justifyContent="space-between">
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                variant="standard"
                type="text"
                onChange={onChange}
                fullWidth
              />

              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                variant="standard"
                onChange={onChange}
                fullWidth
              />
            </Box>

            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              type="text"
              variant="standard"
              onChange={onChange}
              fullWidth
            />
            <Box gap={7} display="flex" justifyContent="space-between">
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={onChange}
                variant="standard"
                fullWidth
              />

              <TextField
                required
                id="passwordRetype"
                name="passwordRetype"
                label="Retype Password"
                type="password"
                variant="standard"
                onChange={onChange}
                fullWidth
              />
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            sx={{ bgcolor: "#2a2d64", borderRadius: 2, m: 1 }}
            onClick={onSubmit}
            variant="contained"
            type="submit"
            endIcon={<HowToReg />}
            size="large"
          >
            Register
          </Button>

          <Box display="flex">
            <Typography mx={1} mt={1} color="text.secondary">
              Already have an account?{" "}
            </Typography>
            <Button
              component={Link}
              to={`/login`}
              endIcon={<Login />}
              sx={{ borderRadius: 2, bgcolor: "#535ac8" }}
              variant="contained"
            >
              Log In
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default RegisterForm;
