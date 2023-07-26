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
import Notes from "./pages/Note/Notes";
import ResetPassword from "./pages/Login/ResetPassword";

import axios from "axios";
import useAuth from "./hooks/useAuth";

const App = () => {
  const {
    auth: { accessToken },
  } = useAuth();

  axios.defaults.headers.common = {
    Authorization: `Bearer ${accessToken}`,
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<SendEmailLink />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES ---- ONLY FOR AUTHENTICATED USERS */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="/notes" element={<Notes />} />
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
