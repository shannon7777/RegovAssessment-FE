import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ notificationMsg, errorMsg, infoMsg, setNotify }) => {
  return (
    <div className="app">
      <main className="content">
        <Navbar setNotify={setNotify} />
        {notificationMsg}
        {errorMsg}
        {infoMsg}
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
