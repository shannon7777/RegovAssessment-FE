import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SendEmailLink from "./pages/Login/SendEmailLink";
import Register from "./pages/Register";
import MissingPage from "./components/MissingPage";
import Layout from "./components/Layout";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import RequireAuth from "./components/RequireAuth";
import Notes from "./pages/Notes";
import ResetPassword from "./pages/Login/ResetPassword";
import CustomAlert from "./components/CustomAlert";

import useAuth from "./hooks/useAuth";
import axios from "axios";

const App = () => {
  const {
    auth: { accessToken },
  } = useAuth();

  axios.defaults.baseURL = `http://localhost:7000/api`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  // declaring states for notification alerts to be passed down
  const [notify, setNotify] = useState({ show: false, text: "" });
  const [error, setError] = useState({ show: false, text: "" });
  const [info, setInfo] = useState({ show: false, text: "" });

  const notificationMsg = (
    <CustomAlert
      variant="success"
      open={notify.show}
      message={notify.text}
      handleClose={() => setNotify({ show: false })}
    />
  );

  const infoMsg = (
    <CustomAlert
      variant="info"
      open={info.show}
      message={info.text}
      handleClose={() => setInfo({ show: false })}
    />
  );

  const errorMsg = (
    <CustomAlert
      variant="error"
      open={error.show}
      message={error.text}
      handleClose={() => setError({ show: false })}
    />
  );

  const notifications = {
    notificationMsg,
    infoMsg,
    errorMsg,
  };

  const setCustomAlerts = {
    setError,
    setNotify,
    setInfo,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout {...notifications} setNotify={setNotify} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login {...setCustomAlerts} />} />
        <Route
          path="/password"
          element={<SendEmailLink {...setCustomAlerts} />}
        />
        <Route
          path="/password-reset"
          element={<ResetPassword {...setCustomAlerts} />}
        />
        <Route path="/register" element={<Register {...setCustomAlerts} />} />

        {/* PROTECTED ROUTES ---- ONLY FOR AUTHENTICATED USERS */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="/notes" element={<Notes {...setCustomAlerts} />} />
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
