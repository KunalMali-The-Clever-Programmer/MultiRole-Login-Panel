// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import {
  GroupRounded,
  SupervisorAccountRounded,
  SecurityRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "../../api/axiosConfig";
import UserTable from "../../components/UserTable";
import { useNavigate } from "react-router-dom";

/* SAME LAYOUT CONSTANTS */
const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 72;

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalManagers: 0,
    totalAdmins: 0,
  });
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
  }, []);

  const fetchAnalytics = async () => {
    const res = await axios.get("/admin/analytics");
    setAnalytics(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/admin/users");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <>
      <Topbar />
      <Sidebar role="ADMIN" />

      {/* SAME OFFSET AS OTHER PAGES */}
      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH + 28}px`,
          mt: `${TOPBAR_HEIGHT + 28}px`,
          mr: 3,
        }}
      >
        <Container maxWidth="xl">
          {/* HEADER */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Grid item>
              <Typography sx={styles.pageTitle}>
                Admin Dashboard
              </Typography>
              <Typography sx={styles.pageSub}>
                System overview & user management
              </Typography>
            </Grid>

            <Grid item>
              <MotionButton
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                sx={styles.addBtn}
                onClick={() => nav("/admin/users/add")}
              >
                <PersonAddAltRounded sx={{ mr: 1 }} />
                Add User
              </MotionButton>
            </Grid>
          </Grid>

          {/* ANALYTICS CARDS */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <StatCard
              title="Total Users"
              value={analytics.totalUsers}
              icon={<GroupRounded />}
              delay={0.1}
            />
            <StatCard
              title="Managers"
              value={analytics.totalManagers}
              icon={<SupervisorAccountRounded />}
              delay={0.2}
            />
            <StatCard
              title="Admins"
              value={analytics.totalAdmins}
              icon={<SecurityRounded />}
              delay={0.3}
            />
          </Grid>

          {/* USER TABLE */}
          <MotionPaper
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={styles.tableCard}
          >
            <Box sx={styles.gridBg} />

            <Typography sx={styles.sectionTitle}>
              User Management
            </Typography>

            <UserTable users={users} onDelete={handleDelete} />
          </MotionPaper>
        </Container>
      </Box>

      {/* GLOBAL ANIMATIONS */}
      <style>
        {`
          @keyframes gridMove {
            from { background-position: 0 0; }
            to { background-position: 420px 420px; }
          }
          @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
    </>
  );
};

/* ---------------- STAT CARD ---------------- */

const StatCard = ({ title, value, icon, delay }) => (
  <Grid item xs={12} md={4}>
    <MotionPaper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      sx={styles.statCard}
    >
      <Box sx={styles.statIcon}>{icon}</Box>
      <Typography sx={styles.statTitle}>{title}</Typography>
      <Typography sx={styles.statValue}>{value}</Typography>
    </MotionPaper>
  </Grid>
);

/* ---------------- STYLES (SAME DESIGN SYSTEM) ---------------- */

const styles = {
  pageTitle: {
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 1,
    background:
      "linear-gradient(90deg, #2563eb, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSub: {
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
  },
  addBtn: {
    px: 3,
    py: 1.4,
    fontWeight: 900,
    letterSpacing: 1,
    borderRadius: 3,
    color: "#fff",
    background:
      "linear-gradient(90deg, #2563eb, #3b82f6, #2563eb)",
    backgroundSize: "200% auto",
    animation: "shine 3s linear infinite",
    boxShadow: "0 20px 45px rgba(37,99,235,0.45)",
  },
  statCard: {
    p: 3,
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.75))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 30px 70px rgba(15,23,42,0.18)",
  },
  statIcon: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0369a1",
    boxShadow: "0 6px 14px rgba(56,189,248,0.35)",
    mb: 1,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#475569",
  },
  statValue: {
    fontSize: 32,
    fontWeight: 900,
    color: "#0f172a",
  },
  tableCard: {
    p: 3,
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(240,249,255,0.7))",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 35px 80px rgba(15,23,42,0.18)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 900,
    mb: 2,
    color: "#0f172a",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "36px 36px",
    opacity: 0.12,
    animation: "gridMove 55s linear infinite",
    pointerEvents: "none",
  },
};

export default AdminDashboard;
