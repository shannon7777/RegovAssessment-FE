import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  HowToReg,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";

const LoginForm = ({ onChange, onSubmit }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        elevation={4}
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          width: 500,
          background: "#94e2cd",
          borderRadius: 4,
        }}
      >
        <form>
          <CardContent sx={{ alignItems: "center" }}>
            <Typography color="#141b2d" variant="h3" fontWeight="bold" mb={2}>
              Log in
            </Typography>
            <Stack gap={2}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="standard"
                onChange={onChange}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type={visible ? "text" : "password"}
                onChange={onChange}
                variant="standard"
                helperText="Do not share your password with anyone"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {visible ? (
                        <IconButton
                          size="small"
                          onClick={() => setVisible(false)}
                        >
                          <Visibility />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => setVisible(true)}
                        >
                          <VisibilityOff />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              sx={{
                width: 200,
                bgcolor: "#2a2d64",
                borderRadius: 2,
                mt: 3,
              }}
              onClick={onSubmit}
              variant="contained"
              type="submit"
              endIcon={<Login />}
              size="large"
            >
              Continue
            </Button>

            <Stack>
              <Typography mx={1} mt={1} color="text.secondary">
                Need an Account?{" "}
              </Typography>
              <Button
                component={Link}
                to={`/register`}
                endIcon={<HowToReg />}
                sx={{ borderRadius: 2, bgcolor: "#535ac8" }}
                variant="contained"
                size=""
              >
                Register
              </Button>
            </Stack>
          </CardActions>
        </form>
        <Divider sx={{ mb: 2}}/>
        <Typography
          sx={{ textDecoration: "none", mx: 18 }}
          variant="h9"
          to={"/password"}
          component={Link}
        >
          Forgot your password?
        </Typography>
      </Card>
    </>
  );
};

export default LoginForm;
