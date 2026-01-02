import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import UserTable from "../components/UserTable";

const DashboardAdmin = () => (
  <Box sx={{ display: "flex" }}>
    <Sidebar role="ADMIN" />
    <Box sx={{ padding: 4, flex: 1 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Admin Dashboard</Typography>
      <Box sx={{ display: "flex" }}>
        <AnalyticsCard title="Total Users" value={120} />
        <AnalyticsCard title="Total Managers" value={10} />
        <AnalyticsCard title="Active Users" value={50} />
      </Box>
      <UserTable role="USER" />
    </Box>
  </Box>
);

export default DashboardAdmin;
