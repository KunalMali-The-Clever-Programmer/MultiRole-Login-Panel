import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Lock, Key } from "@mui/icons-material";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setSaving(true);
      await axiosInstance.put("/user/changePassword", {
        // currentPassword,
        newPassword,
      });
      alert("Password changed successfully");
      navigate("/user/profile");
    } catch (err) {
      console.error("Password change failed", err);
      alert("Password change failed. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      }}
    >
      {/* Sidebar */}
      <Sidebar role="USER" />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 900 }}>
          <Topbar />
        </Box>

        {/* Content */}
        <Box sx={{ mt: 12, px: 3, pb: 5 }}>
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: 0.5,
                  textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                Change Password
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                sx={{
                  p: 5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 16px 36px rgba(15,23,42,0.15)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 22px 42px rgba(15,23,42,0.25)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Current Password - optional */}
                {/* <Tooltip title="Your current password" arrow>
                  <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip> */}

                {/* New Password */}
                <Tooltip title="Enter your new password" arrow>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip>

                {/* Confirm Password */}
                <Tooltip title="Re-enter your new password" arrow>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Key color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip>

                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                    color: "#fff",
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: "0 8px 18px rgba(59,130,246,0.28)",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 28px rgba(59,130,246,0.35)",
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    },
                  }}
                  onClick={handleSubmit}
                  disabled={saving}
                >
                  Change Password
                </Button>
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
