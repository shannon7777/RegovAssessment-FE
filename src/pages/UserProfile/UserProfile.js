import { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  Badge,
  CardContent,
  Stack,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import {
  BadgeRounded,
  Email,
  ManageAccounts,
  Person,
} from "@mui/icons-material";

const UserProfile = () => {
  const {
    auth: {
      user: { firstName, lastName, email, role },
    },
  } = useAuth();
  return (
    <Card sx={{ m: 5, p: 4, borderRadius: 5 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Person fontSize="large" />
          <Typography variant="h4" fontWeight="bold">
            User Profile
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ my: 1}}>
          <BadgeRounded sx={{ mr: 1 }} />
          Full name: {firstName} {lastName}
        </Typography>
        <Typography variant="h6" sx={{ my: 1}}>
          {" "}
          <Email sx={{ mr: 1 }} />
          email: {email}
        </Typography>
        <Typography variant="h6" component={Badge}>
          <ManageAccounts sx={{ mr: 1 }} />
          Role: {role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
