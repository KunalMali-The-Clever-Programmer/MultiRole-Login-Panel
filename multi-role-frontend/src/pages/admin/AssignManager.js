// src/pages/admin/AssignManager.jsx
import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  PersonOutlineRounded,
  SupervisorAccountRounded,
  AutoAwesomeRounded,
} from "@mui/icons-material";
import axiosInstance from "../../api/axiosConfig";
import { motion } from "framer-motion";

/* Layout constants (same as Add/Edit) */
const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 72;

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

const AssignManager = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");

  useEffect(() => {
    axiosInstance.get("/admin/users").then((res) => {
      setUsers(res.data);
      setManagers(
        res.data.filter(
          (u) => (u.role?.name || u.role) === "MANAGER"
        )
      );
    });
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return alert("Please select a user");

    await axiosInstance.put(`/admin/users/${selectedUserId}`, {
      manager:
        selectedManagerId === ""
          ? null
          : { id: Number(selectedManagerId) },
    });

    alert("Manager assigned successfully");
    setSelectedUserId("");
    setSelectedManagerId("");
  };

  return (
    <>
      <Topbar />
      <Sidebar role="ADMIN" />

      {/* SAME OFFSET & ALIGNMENT */}
      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH + 28}px`,
          mt: `${TOPBAR_HEIGHT + 28}px`,
          mr: 3,
        }}
      >
        <Container maxWidth="sm">
          <MotionPaper
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            elevation={0}
            sx={styles.card}
          >
            {/* Wireframe background */}
            <Box sx={styles.gridBg} />

            {/* Header */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography sx={styles.title}>
                Assign Manager
              </Typography>
              <Typography sx={styles.subtitle}>
                Link users with managers securely
              </Typography>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleAssign}
              sx={{ mt: 3, position: "relative", zIndex: 2 }}
            >
              <ProSelect
                label="Select User"
                icon={<PersonOutlineRounded />}
                value={selectedUserId}
                onChange={(e) =>
                  setSelectedUserId(e.target.value)
                }
                options={[
                  { label: "— Select User —", value: "" },
                  ...users.map((u) => ({
                    label: `${u.username} (${u.role?.name || u.role})`,
                    value: u.id,
                  })),
                ]}
              />

              <ProSelect
                label="Select Manager (optional)"
                icon={<SupervisorAccountRounded />}
                value={selectedManagerId}
                onChange={(e) =>
                  setSelectedManagerId(e.target.value)
                }
                options={[
                  { label: "None", value: "" },
                  ...managers.map((m) => ({
                    label: m.username,
                    value: m.id,
                  })),
                ]}
              />

              {/* PRO BUTTON (same as others) */}
              <MotionButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                sx={styles.createBtn}
              >
                <AutoAwesomeRounded sx={{ mr: 1 }} />
                Assign Manager
              </MotionButton>
            </Box>
          </MotionPaper>
        </Container>
      </Box>

      {/* Animations */}
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

/* ---------------- PRO SELECT ---------------- */

const ProSelect = ({ label, icon, options, ...props }) => (
  <TextField
    select
    fullWidth
    label={label}
    sx={styles.field}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Box sx={styles.iconBox}>{icon}</Box>
        </InputAdornment>
      ),
    }}
    {...props}
  >
    {options.map((opt) => (
      <MenuItem key={opt.value} value={opt.value}>
        {opt.label}
      </MenuItem>
    ))}
  </TextField>
);

/* ---------------- STYLES (SAME AS ADD / EDIT) ---------------- */

const styles = {
  card: {
    p: 4,
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(240,249,255,0.7))",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 35px 80px rgba(15,23,42,0.18)",
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
  title: {
    fontSize: 26,
    fontWeight: 900,
    letterSpacing: 1,
    background:
      "linear-gradient(90deg, #2563eb, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    mt: 0.5,
  },
  field: {
    mb: 2.4,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      background: "rgba(255,255,255,0.8)",
      transition: "all 0.25s ease",
      "&:hover": {
        boxShadow: "0 10px 22px rgba(59,130,246,0.18)",
      },
      "&.Mui-focused": {
        boxShadow: "0 14px 30px rgba(59,130,246,0.35)",
      },
    },
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0369a1",
    boxShadow: "0 4px 10px rgba(56,189,248,0.35)",
  },
  createBtn: {
    mt: 3,
    py: 1.4,
    fontSize: 15,
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
};

export default AssignManager;
