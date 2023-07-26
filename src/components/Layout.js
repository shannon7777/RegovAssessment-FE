import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="app">
      <main className="content">
        <Navbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
