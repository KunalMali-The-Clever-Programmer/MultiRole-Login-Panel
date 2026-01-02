import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";

const DashboardManager = () => (
  <Box sx={{ display: "flex" }}>
    <Sidebar role="MANAGER" />
    <Box sx={{ padding: 4, flex: 1 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Manager Dashboard</Typography>
      <UserTable role="USER" />
    </Box>
  </Box>
);

export default DashboardManager;
