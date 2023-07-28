import { useState, useEffect } from "react";
import axiosApi from "../../lib/axios";
import useAuth from "../../hooks/useAuth";

import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdminPanelSettings, Note, Person } from "@mui/icons-material";
import UserNotes from "./UserNotes";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const {
    auth: { user },
  } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const {
        data: { users },
        status,
      } = await axiosApi(`users`);
      if (status !== 200) return;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack m={5} direction="row">
        <Typography variant="h3">Admin Dashboard</Typography>
        <AdminPanelSettings
          sx={{ mt: 2, mx: 2, color: "#3da58a" }}
          fontSize="large"
        />
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ mb: 2, background: "#141b2d", m: 3 }}
        elevation={4}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={`header-${index}`}>
                  <Typography color="white" fontWeight="bold" fontSize={15}>
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user) => (
              <TableRow key={`user-${user._id}`}>
                <TableCell>
                  <Typography color="white">{user._id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white">{user.firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white">{user.lastName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  {user.role === "Admin" ? (
                    <>
                      <AdminPanelSettings sx={{ color: "white" }} />{" "}
                      <Typography color="white">Admin</Typography>
                    </>
                  ) : (
                    <>
                      <Person sx={{ color: "white" }} />
                      <Typography color="white">User</Typography>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <UserNotes user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPage;

const tableHeaders = [
  "User id",
  "First Name",
  "Last Name",
  "Email",
  "Role",
  "Notes",
];
