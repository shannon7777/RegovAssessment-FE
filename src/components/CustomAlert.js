import { Alert, Snackbar } from "@mui/material";

const CustomAlert = ({ message, handleClose, open, variant }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
